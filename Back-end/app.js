import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

dotenv.config({
  path: "./custom/path/.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

connectDB(mongoURI);

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//routes
app.use("/api/v1/user", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
