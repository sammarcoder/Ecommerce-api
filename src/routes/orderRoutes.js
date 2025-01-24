const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorize");

router.get(
  "/",authenticate,
  getUserOrders

  // (req,res)=>{res.json({message : 'its working'})}
);
router.post("/",authenticate, createOrder);
router.put('/:id',authenticate,authorize('admin'), updateOrderStatus)

module.exports = router;

// console.log('hi')
