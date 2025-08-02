const generatePrompt = (location, budget, people, duration) => {
  return `Generate a travel plan in pure JSON format for the following:

Location: ${location}

Trip Duration: ${duration} Days

Group Size: ${people} people

Budget: ${budget}

The JSON should follow this schema:

Top-level fields:

- location (string): Name of the destination
- budget (string): One of "cheap", "moderate", "expensive"
- people (number): Total number of people
- duration (number): Number of days of the trip

- hotels (array): Each hotel object should include:
  - name (string): Hotel name
  - address (string): Full hotel address
  - price (number): Average price per night in USD
  - imageUrl (string): Link to an image of the hotel
  - coordinates: { lat: number, lng: number }
  - rating (number): Out of 5
  - description (string): Short description of the hotel

- itinerary (array): One entry for each day. Each day object should include:
  - day (number): Day number (1, 2, 3...)
  - bestTimeToVisit (string): Best time of day to explore (e.g., "Morning", "Evening")
  - places (array):
    - placeName (string)
    - placeDetails (string): Description
    - imageUrl (string): Image link
    - coordinates: { lat: number, lng: number }
    - ticketPrice (number): Entry cost in USD
    - travelTime (string): Time to reach from hotel (e.g., "15 mins from hotel")

Only return valid JSON. No markdown, no commentary, no headings.`;
};

module.exports = {
  generatePrompt,
};
