// backend/index.js
import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
//import generateRoutes from "./routes/generateRoutes.js";

dotenv.config();

const app = express();

// Using middleware
app.use(express.json());
app.use(cors());

// Importing routes
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
//app.use("/api/generate", generateRoutes); // Add this line for the new route

app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT}`);
  connectDb();
});
