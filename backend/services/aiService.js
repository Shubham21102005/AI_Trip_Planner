// services/aiService.js
import { generatePrompt } from '../utils/generatePrompt.js';
import { GoogleGenAI, Type } from '@google/genai';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const tripResponseSchema = {
  type: Type.OBJECT,
  properties: {
    location: { type: Type.STRING },
    budget: { type: Type.STRING, enum: ['cheap', 'moderate', 'luxury'] },
    people: { type: Type.INTEGER },
    duration: { type: Type.INTEGER },
    hotels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          address: { type: Type.STRING },
          price: { type: Type.NUMBER },
          imageUrl: { type: Type.STRING },
          coordinates: {
            type: Type.OBJECT,
            properties: {
              lat: { type: Type.NUMBER },
              lng: { type: Type.NUMBER }
            },
            required: ['lat', 'lng']
          },
          rating: { type: Type.NUMBER },
          description: { type: Type.STRING }
        },
        required: ['name', 'address', 'price', 'coordinates']
      }
    },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          bestTimeToVisit: { type: Type.STRING },
          places: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                placeName: { type: Type.STRING },
                placeDetails: { type: Type.STRING },
                imageUrl: { type: Type.STRING },
                coordinates: {
                  type: Type.OBJECT,
                  properties: {
                    lat: { type: Type.NUMBER },
                    lng: { type: Type.NUMBER }
                  },
                  required: ['lat', 'lng']
                },
                ticketPrice: { type: Type.NUMBER },
                travelTime: { type: Type.STRING }
              },
              required: ['placeName']
            }
          }
        },
        required: ['day', 'places']
      }
    }
  },
  required: ['location', 'budget', 'people', 'duration', 'hotels', 'itinerary'],
  propertyOrdering: ['location', 'budget', 'people', 'duration', 'hotels', 'itinerary']
};

export async function createTripAI(location, budget, people, duration) {
  const validBudgets = ['cheap', 'moderate', 'luxury'];
  if (
    !location ||
    !validBudgets.includes(budget) ||
    !Number.isInteger(people) ||
    !Number.isInteger(duration)
  ) {
    throw new Error('Invalid input parameters');
  }
  

  const prompt = generatePrompt(location, budget, people, duration);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: tripResponseSchema
      }
    });

    // JSON mode → response.text returns the full JSON string.
    const jsonString = response.text;
    const tripData = JSON.parse(jsonString);

    return tripData;
  } catch (err) {
    console.error('createTripAI error:', err.code ?? err.message ?? err);
    if (err.message?.includes('InvalidArgument')) {
      throw new Error('Response schema violation — verify prompt vs schema');
    }
    throw err;
  }
}
