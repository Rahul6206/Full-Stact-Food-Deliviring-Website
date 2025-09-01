import User from "../models/user.model.js";
import Token from "../utils/token.js";
import bcrypt from "bcrypt"
export const Singup = async (req, res) => {
    try {
        const { fullname, email, password, contactnumber, role } = req.body;
        const user = await User.findOne({ $or: [{ email }, { contactnumber }] });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!fullname || !email || !password || !contactnumber) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (role && !['user', 'restaurantowner', 'deliveryboy'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const encpassword=await bcrypt.hash(password,10);
        const newUser = new User({ fullname, email, password: encpassword, contactnumber, role: role  });
        const token= Token(newUser._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:24*60*60*1000
        })
        // await newUser.save();
       return res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email, contactnumber: newUser.contactnumber, role: newUser.role }, token });
        // res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Singup error is: ", error);
        
        res.status(500).json({ message: "Server error", error: error.message });

    }
}
export const Singin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne(email);
        if (!user) {
            return res.status(400).json({ message: "User not exists" });
        }
        
        const decpassword=await bcrypt.compare(password,user.password);
        if(!decpassword){
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token= Token(newUser._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:"strict",
            maxAge:24*60*60*1000
        })
        // await newUser.save();
       return res.status(20).json({ message: "User Login successfully", user});
        // res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Singin error is: ", error);
        
        res.status(500).json({ message: "Server error", error: error.message });

    }
}

export const Signout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        console.log("Signout error is: ", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}