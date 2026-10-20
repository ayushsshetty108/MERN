import mongoose from "mongoose"
import Product from "../models/product.model.js";

export const getProduct=async(req,res)=>{
  try{
    const products=await Product.find({});
    res.status(200).json({success:true, products})
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"internal server error"});
  }
}

export const postProduct=async (req, res) => {
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
}

export const deleteProduct= async (req,res)=>{
    const {id}=req.params;
    console.log("id", id);
    try{
      await Product.findByIdAndDelete(id);
      res.status(200).json({success:true,message:"product delete successfully"});
    }catch(err){
    res.status(404).json({success:false,message:"product nit found"});
    }
}

export const putProduct=async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product: updatedProduct });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Failed to update product" });
  }
}