import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js"; 

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message : "All fields are required"});
        }

        if (password.length<8){
            return res.status(400).json({message : "All fields are required"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message : "user with email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,fullName,password : hashedPassword
        });

        if(newUser){
            const savedUser = newUser.save();
            generateToken(savedUser._id,res);
    
            res.status(201).json({
                id: newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }
        else{
            res.status(400).json({message:"Invalid User data"});
        }

    }
    catch(error){
        console.log("Error in Signup Controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}