const express = require("express");
const router = express.Router();
const productRoutes = require("../routes/productRoutes");
const authRoutes = require("./authroutes");
const adminRoutes = require("./adminRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes = require("./cartRoutes");
const stripeRoutes = require('./stripeRoutes')

router.get("/", (req, res) => {
  res.json({ message: "welcome to ecommercer website" });
});

router.use("/products", productRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/order", orderRoutes);
router.use("/cart", cartRoutes);
router.use('/payment',stripeRoutes,express.raw({ type: 'application/json' }))

module.exports = router;
