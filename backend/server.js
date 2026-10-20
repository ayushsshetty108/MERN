import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import  Product  from "./models/product.model.js"; // ✅ import model

dotenv.config();
const app = express();
app.use(express.json());

// POST route
app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  }
});

// Connect DB first, then start server
const startServer = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

startServer();
