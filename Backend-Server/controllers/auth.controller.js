import User from "../models/user.model";

const Singup = async (req, res) => {
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
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
}