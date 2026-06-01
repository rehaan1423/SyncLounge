import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not configured");
    }

    const token = jwt.sign({ userId },JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // in ms
        httpOnly: true, //to press cross site scripting attacks
        sameSite: "strict", // to prevent CSRF
        secure: process.env.NODE_ENV == "production" ? true : false
    })

    return token;
}