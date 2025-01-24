const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,

      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0,
    },
    category:  {
        type : DataTypes.STRING,
        allowNull : true
    }
  }
);


Product.associate = (models) => {
  Product.hasMany(models.Order, { foreignKey: 'productId', as:'orders' });
};

module.exports = Product;
