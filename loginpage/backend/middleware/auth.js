const jwt=require("jsonwebtoken");

module.exports=(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1];

    if(!token){
        res.status(401).json({
            message:"token not found"
        })
    }
    try{
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decoded;
        next()
    }
    catch {

        res.status(401).json({
            message: "Invalid Token"
        });

    }
};