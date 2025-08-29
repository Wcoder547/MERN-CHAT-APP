import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "chatApp" })
    .then((data) => {
      console.log(
        `MongoDB connected with ${data.connection.host}:${data.connection.port}`
      );
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("chat-app-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export { connectDB, sendToken };
