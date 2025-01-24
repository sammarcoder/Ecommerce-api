

// const Product = require('../models/product')
// const User = require('../models/user');
// const Order = require('../models/order');
 const { sequelize } = require('../config/database');
// const Order = require('../models/order')(sequelize, require('sequelize').DataTypes);

const { User, Product, Order } = require('../models');

console.log(User.associations); // Check associations for User
console.log(Product.associations); // Check associations for Product
console.log(Order.associations); // Check associations for Order




// console.log(Product)
// const createOrder = async (req, res) =>{
//     try{
       
//         const {productId} = req.body;
//         console.log({'productId': productId})
//         // console.log(req.Product.id)
//         const product = await Product.findByPk(productId)
//         // console.log(req.product)
//         if(!product){
//             res.status(200).json({message :'product not found'})
//         }
//         res.status(200).json({sucess :true, data : product })
//     }
//     catch(err){
//         res.status(500).json({sucess:false, error : err.message})
//     }
// }


// const { Order, Product } = require('../models');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        const totalPrice = product.price * quantity;

        const order = await Order.create({
            userId: req.user.id, // Authenticated user ID
            productId,
            quantity,
            totalPrice,
            status: 'pending',
        });
        

        res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [{ model: Product,as : 'product' }],
        });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.status = status;
        // order.productId = productId
        await order.save();

        res.status(200).json({ success: true, message: 'Order status updated successfully', data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};




module.exports = { createOrder, getUserOrders, updateOrderStatus };


