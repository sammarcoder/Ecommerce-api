const { Sequelize } = require("sequelize");
const Product = require("../models/product");
// const { search } = require("../routes");


async function check(req,res) {
  const products = await Product.findAll();
  console.log(products);
} 

// check();

//  Post Products
const createProduct = async (req, res) => {
  try {
    const { name, price, description, stock, category } = req.body;
    const product = await Product.create({ name, price, description, stock , category});
    res.status(200).json({ sucess: product });
  } catch (err) {
    console.log(err);
  }
};

// Get All Products with pagination and search and filtering

// const getAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = '',category = '', minPrice = 0, maxPrice = 10000 } = req.query;

//     const offset = (page - 1) * limit;
//     products = await Product.findAll({
//       where: {
//         name : {
//           [Sequelize.Op.like]: `%${search}`,
//         },
//         category : {
//           [Sequelize.Op.like] : `%${category}`
//         },
//         price : {
//           [Sequelize.Op.between] : `%${minPrice, maxPrice}`
//         }
//       },
//       limit: parseInt(limit),
//       offset: parseInt(offset),
//     });

//     const totalProducts = await Product.count({
//       where : {
//         name:{
//           [Sequelize.Op.like]: `%${search}`
//         },
//         category : {
//           [Sequelize.Op.like] : `%${category}`
//         },
//         price : {
//           [Sequelize.Op.between] : `%${minPrice, maxPrice}` 
//         }
//       }
//     });

//     res.status(200).json({
//       sucess: true,
//       data: products,
//       totalProducts,
//       totalPages: Math.ceil(totalProducts / limit),
//       currentPage: parseInt(page),
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Get all products with search, filters, and pagination
const getAllProducts = async (req, res) => {
  try {
      const { page = 1, limit = 10, search = '', category = '', minPrice = 100, maxPrice = 10000 } = req.query;

      const offset = (page - 1) * limit;

      const products = await Product.findAll({
          where: {
              name: {
                  [Sequelize.Op.like]: `%${search}%`,
              },
              category: {
                  [Sequelize.Op.like]: `%${category}%`, // Filter by category
              },
              price: {
                  [Sequelize.Op.between]: [minPrice, maxPrice], // Filter by price range
              },
          },
          limit: parseInt(limit),
          offset: parseInt(offset),
          logging: console.log
      });

      const totalProducts = await Product.count({
          where: {
              name: {
                  [Sequelize.Op.like]: `%${search}%`,
              },
              category: {
                  [Sequelize.Op.like]: `%${category}%`,
              },
              price: {
                  [Sequelize.Op.between]: [minPrice, maxPrice],
              },
          },
      });

      res.status(200).json({
          success: true,
          data: products,
          totalProducts,
          totalPages: Math.ceil(totalProducts / limit),
          currentPage: parseInt(page),
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};



const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, description, stock,category } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ message: "product not found" });
    };
    
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.category = product.category;

    await product.save();

    await product.update({ name, price, description, stock, category });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete a product
const deleteProduct = async (req, res) => {
  try {
      const { id } = req.params; // Get product ID from URL params

      const product = await Product.findByPk(id); // Find product by ID

      if (!product) {
          return res.status(404).json({ success: false, message: 'Product not found' });
      }

      await product.destroy(); // Delete the product

      res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};


// const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, price, description, stock } = req.body;
//         const product = await Product.findByPk(id);
//         if (!product) {
//             return res.status(404).json({ success: false, message: 'Product not found' });
//         }
//         await product.update({ name, price, description, stock });
//         res.status(200).json({ success: true, product });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (deleteProduct === 0) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     return res.status(200).send({
//       message: "Song delted sucessfully",
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
  