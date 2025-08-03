const express= require('express');
const cors= require('cors')
const dotenv= require('dotenv')
const connectDB= require('./utils/connectdb.js');
const authRoutes= require('./routes/authRoutes.js')
const cookieParser = require('cookie-parser');
const tripRoutes= require('./routes/tripRoutes.js')


dotenv.config()
const app= express();
const PORT= process.env.PORT || 5000;

// CORS configuration for credentials
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser()); 

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/trips', tripRoutes)


app.listen(PORT, async ()=>{
    try{
        await connectDB();
        console.log(`App is listening on ${PORT}`);
    }catch(error){
        console.log(error);
    }
})

