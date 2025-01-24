// const express = require('express');
// const router = express();
// const getAllProducts  = require('../controllers/adminController');
// const authenticate = require('../middlewares/authMiddleware');
// const authorize  = require('../middlewares/authorize');

// router.get('/products',authenticate,authorize('admin'), getAllProducts)

// module.exports = router


const express = require("express");
const Router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const { addProduct, updateProduct, deleteProduct,getAllProducts } = require("../controllers/adminController");

// Add a new product
Router.post("/products", authenticate, isAdmin, addProduct);

Router.get("/products", authenticate, isAdmin, getAllProducts);

// Update an existing product
Router.put("/products/:id", authenticate, isAdmin, updateProduct);

// Delete a product
Router.delete("/products/:id", authenticate, isAdmin, deleteProduct);

module.exports = Router;
