const { sequelize } = require('../config/database');
const Sequelize = require('sequelize');

const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const Cart = require('./cart')(sequelize,Sequelize.DataTypes)

const models = {
  User: User,
  Product: Product,
  Order: Order,
  Cart:Cart
};

// Call associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
