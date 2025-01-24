const authorize = (requiredRole) => (req,res,next)=>{
    if (req.user.role !== requiredRole) {
        return res.status(403).json({sucess : false,message: 'Acess denied , insufficente privilages'})
    }

    next ();
}

module.exports = authorize;
