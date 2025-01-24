// const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ sucess: true, products});
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

// module.exports = getAllProducts


const { Product } = require("../models");

// Add a new product
const addProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const newProduct = await Product.create({ name, price, stock });

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update an existing product
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, stock } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.name = name || product.name;
        product.price = price || product.price;
        product.stock = stock || product.stock;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        await product.destroy();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = { addProduct, updateProduct, deleteProduct,getAllProducts };

