'use strict';
const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
// const Product  =require('./product')
// const User = require('./user')



    const Order = sequelize.define('Order', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending', // Default order status
        },
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, { foreignKey: 'userId',as:'user' });
        Order.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    };

    module.exports = Order

