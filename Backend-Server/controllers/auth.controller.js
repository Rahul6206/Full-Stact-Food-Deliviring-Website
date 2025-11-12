import User from "../models/user.model.js";
import { sendOtp } from "../utils/mail.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const Singup = async (req, res) => {
    console.log(req.body);
    try {
        const { fullname, email, password, contactnumber, role } = req.body;
        const user = await User.findOne({ $or: [{ email }, { contactnumber }] });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (contactnumber.length > 10) {
            return res.status(400).json({ message: "Contact number is not valid" });
        }
        if (!fullname || !email || !password || !contactnumber || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (role && !['user', 'Owner', 'Delivery Boy'].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const encpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: encpassword, contactnumber, role: role });
      
        const token = jwt.sign(
            { id: newUser._id },    
            process.env.JWT_SECRET,        
            { expiresIn: "1d" }            
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, fullname: newUser.fullname, email: newUser.email, contactnumber: newUser.contactnumber, role: newUser.role }, token });
        // res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log("Singup error is: ", error);

        res.status(500).json({ message: "Server error", error: error.message });

    }
}
export const Singin = async (req, res) => {
   

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not exists" });
        }

        const decpassword = await bcrypt.compare(password, user.password);
        if (!decpassword) {
            return res.status(400).json({ message: "Invalid Password" });
        }
        const token = jwt.sign(
            { id: user._id },    
            process.env.JWT_SECRET,        
            { expiresIn: "1d" }            
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        console.log(user.role)
        return res.status(200).json({ message: "User Login successfully", user });

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


export const sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not exists" });
        }

        const Generateotp = Math.floor(1000 + Math.random() * 9000);
        user.otp = Generateotp;
        user.isexpried = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 minutes
        user.isverified = false;

        await user.save();
        await sendOtp(user.email, user.otp);

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error sending OTP", error: error.message });
    }
};

export const verifiedOTP = async (req, res) => {
    try {
        const { email, Resetotp } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (
            user.otp.toString() !== Resetotp.toString() ||
            user.isexpried < new Date()
        ) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isverified = true;
        user.otp = undefined;
        user.isexpried = undefined;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(400).json({ message: "OTP verify error", error: error.message });
    }
};

export const Reserpassword = async (req, res) => {

    try {
        const { email, newpassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User Not found" });
        }
        if (!user.isverified) {
            return res.status(400).json({ message: "Otp verification is required " });
        }
        const encpassword = await bcrypt.hash(newpassword, 10);
        user.password = encpassword;
        user.isverified = false;
        await user.save();
        return res.status(200).json({ message: "Password reset succesfully" });
    } catch (error) {
        return res.status(400).json({ message: "Password Reset error", error: error.message });
    }


}