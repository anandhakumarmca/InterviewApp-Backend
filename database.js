import mongoose from "mongoose";

export function dataBaseConnection(){
    const params ={
            useNewUrlParser: true,
            useUnifiedTopology: true,
    }
    try {
        mongoose.connect( process.env.MONGO_URL, params);
        console.log("MongoDB connected sucessfully");   
    }catch(error){
        console.log("MongoDB Connection Failed",error);
    }
}