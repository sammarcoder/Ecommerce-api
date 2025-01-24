const validateProduct = (req, res, next) => {
  const { name, price, description, stock } = req.body;
  if (!name || typeof name !== "string") {
    return res
      .status(500)
      .json({
        sucess: false,
        message: `Please Enter the or name should be a string.`,
      });
  }

  if (!price || typeof price !== "number") {
    return res
      .status(500)
      .json({
        sucess: false,
        message: `Please Enter the product price or price should be in number`,
      });
  }

  if (!description || typeof description !== "string") {
    return res
      .status(500)
      .json({
        sucess: false,
        message: `Description is required or Enter the desciption the description `,
      });
  }

  if(!price ||typeof price !=='number'){
    return res.status(500).json({sucess : flase, mesage: `Stock  is required or Enter the stock number `})
  }

  next();
};

module.exports = validateProduct


