const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role == "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ sucess: false, message: "Acess denied admin only" });
    }
  } catch (err) {
    res.status(500).json({
        sucess:false, message: err.message
    })
  }
};

module.exports = isAdmin