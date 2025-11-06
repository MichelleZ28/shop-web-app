import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProdcuts = async (req, res) => {
    try {
        const products = await Product.find({}); //fetch all
        res.status(200).json({success: true, data: products});

    } catch (error) {
        console.log("error in fetching products: ", error.message );
        res.status(500).json({success:false, message:"Sever error"});
    }
};

export const createProduct = async (req, res) => {
    const product = req.body; // user will enter 
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message:"please provide all fields"});
    }
    const newProduct = new Product(product)
    console.log("Successfully created");

    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    }
    catch(error){
        console.error("Error in create product: ", error.message);
        res.status(500).json({success: false, message:"Server error"});
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    try {

        //Product is the object Type. 
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true}); 
        res.status(200).json({success: true, data: updatedProduct});

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const deleteProduct = async (req, res) => {
  const id = String(req.params.id).trim();

  // 1) Validate ObjectId format first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product id' });
  }

  try {
    // 2) Attempt deletion
    const deleted = await Product.findByIdAndDelete(id);

    // 3) Handle "not found"
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // 4) Success
    return res.status(200).json({ success: true, message: 'Product deleted', data: deleted });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

