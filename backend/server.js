import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = express();

app.get("/products", (req, res) => {
  
});
app.listen(3000, () => {
        connectDb();
      console.log("server is running on port 3000");
    });
