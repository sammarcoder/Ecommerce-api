const express = require("express");
const Router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const validateProduct = require("../middlewares/validateProduct");

const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

Router.post("/", authenticate, validateProduct, createProduct),
  Router.get("/", getAllProducts),
  Router.get("/:id", authenticate, getProductById),
  Router.put(
    "/:id",
    authenticate,
    authorize("admin"),
    validateProduct,
    updateProduct
  ),
  Router.delete("/:id", authenticate, authorize("admin"), deleteProduct);

// Product Inventory ka pata ni sai ha ya ni



module.exports = Router;
