const jsonwebtoken = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../middlewares/authentication.middleware");
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const adminLogIn = async (req, res, next) => {
    try {

        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        if (userName === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
            const accessToken = generateAccessToken({ userName });
            const refreshToken = generateRefreshToken({ userName });

            return res.status(200).json({
                message: "Login successful",
                accessToken,
                refreshToken
            });
        } else {
            return res.status(401).json({ message: "Login failed" });
        }
    } catch (error) {
        console.error("Error during admin login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    adminLogIn
};
