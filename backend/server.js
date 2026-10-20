import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/products", productRoute);
// Connect DB first, then start server
const PORT=process.env.PORT || 5000
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
