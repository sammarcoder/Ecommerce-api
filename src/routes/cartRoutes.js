const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  checkoutCart
} = require("../controllers/cartController")
const authenticate = require('../middlewares/authMiddleware')
const { checkInventory } = require("../middlewares/checkInventory");

// const { checkoutCart } = require("../controllers/cartController");

router.post("/checkout",authenticate, checkInventory, checkoutCart);

router.post("/add", addToCart);
router.get("/add", getCart);
router.delete('/remove/:id',removeFromCart);
router.put('/update/:id',updateCartItem)

module.exports = router;
