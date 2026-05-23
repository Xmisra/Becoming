import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

function setUser(user) {

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
    };

    return jwt.sign(payload, secret,{
        expiresIn:"7d"
    });
}

export default setUser;