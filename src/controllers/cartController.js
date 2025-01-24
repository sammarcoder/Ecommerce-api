// const {sequelize} = require('../config/database')
// const Cart = require('../models/cart')(sequelize,require('sequelize').DataTypes)

const { Cart, Product } = require("../models");
const addToCart = async (req, res) => {
  try {
    const { productId, userId, quantity } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    const existingCartitem = await Cart.findOne({
      where: { userId, productId },
    });
    if (existingCartitem) {
      existingCartitem.quantity += quantity;
      await existingCartitem.save();
      return res
        .status(200)
        .json({ sucess: true, message: "Cart updated", existingCartitem });
    }
    const cart = await Cart.create({ productId, userId, quantity });
    res
      .status(200)
      .json({ success: true, message: "Item Added to your Cart", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.query;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product }],
    });
    res.status(200).json({ success: true, cartItems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartItems = await Cart.findByPk(id);
    if (!cartItems) {
      res.status(404).json({ success: false, message: "Cart item not found" });
    }
    await cartItems.destroy();
    res
      .status(200)
      .json({ success: true, message: "item from cart deleted sucessfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartItem = await Cart.findByPk(id);
    if (!cartItem) {
      res
        .status(404)
        .json({ success: false, message: "Item from cart not found" });
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    res
      .status(200)
      .json({ success: true, message: "item from Cart updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// const checkoutCart = async (req, res) => {
//   try {
//     const userId = req.body.id;
//     const cartItems = await Cart.findAll({
//       where: {
//         userId,
//       },
//     });
//     for (const item of cartItems) {
//       const product = await Product.findByPk(item.productId);
//       if (!product || product.stock < item.quantity) {
//         return res.status(400).json({
//           success: false,
//           message: `Insufficient stock for product: ${product ? product.name : 'Unknown'}`,
//         });
//       }
//       // Stock کم کریں
//       product.stock -= item.quantity;
//       await product.save();
//     }
//     await Cart.destroy({ where: { userId } });

//     res.status(200).json({ success: true, message: 'Checkout successful' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   } 
// };

// const { Product, Cart } = require('../models'); // Cart model import کریں

const checkoutCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Cart سے user کے تمام items لیں
    const cartItems = await Cart.findAll({ where: { userId } });

    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);

      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product ? product.name : 'Unknown'}`,
        });
      }

      // Product کی stock کو update کریں
      product.stock -= item.quantity;
      await product.save();
    }

    // Checkout کے بعد Cart کو صاف کریں
    await Cart.destroy({ where: { userId } });

    res.status(200).json({ success: true, message: 'Checkout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


console.log("hi");

// console.log(Cart.rawAttributes)
// console.log(Product.rawAttributes)

// console.log(sequelize)

module.exports = { addToCart, getCart, removeFromCart, updateCartItem,checkoutCart };
