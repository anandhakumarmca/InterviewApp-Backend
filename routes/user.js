import express from "express";
import bcrypt from "bcrypt";
import { generateToken, getUserByEmail } from "../controllers/user.js";
import { User } from "../models/users.js";

const router = express.Router();

//Login
router.post("/login", async (req, res) => {
  try {
    //Check User Exist or Not
    const user = await getUserByEmail(req);
    if (!user) {
      return res.status(400).json({
        error: "Invalid authorization",
      });
    }
    else{
      console.log("Login with",user)
    }
    //validating the password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validatePassword) {
      return res.status(400).json({
        error: "Invalid authorization",
      });
    }

    //generate password
    const token = generateToken(user._id);
    res.status(200).json({
        message : "Logged In", token
    })
  } catch (error) {
    res.status(500).json({error : "Internal Server"}); 
  }
});

//Signup
router.post("/signup", async (req, res) => {
  try {
    //Check user already exist
    let user = await getUserByEmail(req);
    if (user) {
      return res.status(400).json({ error: "User Already Exist!" });
    }
    //Generate Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({
      ...req.body,
      password: hashedPassword,
    }).save();
    //Generate token and send response
    const token = generateToken(user._id);
    res.status(201).json({
      message: "Registered Successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export const userRouter = router;
