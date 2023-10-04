import mongoose from "mongoose";

export async function dataBaseConnection() {
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000,
    };

    try {
        await mongoose.connect(process.env.MONGO_URL, params);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB Connection Failed", error);
        // You might want to throw the error again or handle it accordingly
        throw error;
    }
}
