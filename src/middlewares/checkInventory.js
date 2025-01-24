const { Product } = require("../models");

const checkInventory = async (req, res,next) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message:
          "Insufficient stock for this product, plesae select less products",
      });
    }
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// console.warn("hi");

module.exports = { checkInventory };
