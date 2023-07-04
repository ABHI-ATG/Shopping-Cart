const jwt=require("jsonwebtoken");
const User=require("../models/userSchema")

const authenticate=async (req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const verify=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({_id:verify._id})
        
        if(!rootUser){
            return res.status(400).send("Login First");
        }

        req.token=token;
        req.rootUser=rootUser;
        req.userId=rootUser._id;

        next();
    }catch(err){
        res.status(401).send("Unauthorised");
    }
}

module.exports=authenticate;