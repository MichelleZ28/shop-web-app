import express from "express";
import { createProduct, deleteProduct, getProdcuts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

export default router;

//Get all product method 
router.get("/", getProdcuts);

// Create a new product method
router.post("/", createProduct);

//Update a product method
//put will update all fields, patch will update some fields
router.put("/:id", updateProduct);

//try to delete a product :id is referring to an id
router.delete('/:id', deleteProduct);