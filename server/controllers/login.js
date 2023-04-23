import User from "../models/User.js";
import { setToken } from "../token/token.js";

export const postUserByEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            res.status(401).json({ message: "邮箱或密码不能为空" });

        const user = await User.findOne({ email, password });
        if (!user) throw new Error("Email or password wrong!");
        const token = await setToken(email, user.role);
        res.status(200).json({
            message: "login success",
            data: { token, user },
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
