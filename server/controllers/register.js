import User from "../models/User.js";

export const newUser = async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user) throw new Error("该邮箱已经被创建");
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
            country: req.body.country,
        });
        res.status(200).json({ status: 200, message: "创建成功" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
