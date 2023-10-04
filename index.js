import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBaseConnection } from "./database.js";
import { userRouter } from "./routes/user.js";
import { notesRouter } from "./routes/notes.js";
import { isAuthorized } from "./middlewares/auth.js";

//Configuring the environmental variable
dotenv.config();

//Server Setup
const app = express ();
const PORT = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());

//Database Connection
dataBaseConnection();

//Routes
app.use("/api/user", userRouter);
app.use("/api/notes", isAuthorized, notesRouter)

//Listening the Server
app.listen(PORT, ()=>{
    console.log(`server Started in localhost:${PORT}`)
}); 