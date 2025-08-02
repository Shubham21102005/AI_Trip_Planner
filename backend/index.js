const express= require('express');
const cors= require('cors')
const dotenv= require('dotenv')
const connectDB= require('./utils/connectdb.js');

dotenv.config()
const app= express();
const PORT= process.env.PORT;

app.use(cors());
app.use(express.json());


app.listen(PORT, async ()=>{
    try{
        await connectDB();
        console.log(`App is listening on ${PORT}`);
    }catch(error){
        console.log(error);
    }
})

