const User=require("../models/userSchema");
const bcrypt=require("bcrypt");

const register=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            console.log("Signup Invalid Details")
            return res.status(400).send("Invalid Details");
        }
        const UserExist=await User.findOne({email:email})
        if(UserExist){
            console.log("Sign up User Already Exist");
            return res.status(400).send("User Already Exist")
        }
        
        const data=new User({name,email,password});
        const UserRegister= await data.save();
        if(UserRegister){
            console.log("Sign up Registered Success");
            return res.status(200).send("Registered Successfully");
        }
        console.log("Sign up Failed to register");
        return res.status(400).send({error:"Failed to registered"});
    }catch(err){
        console.log("Sign up Error");
        return res.status(400).send({error:"Failed to registered"});
    }
}

const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).send({error:"Fill all details"});
        }
        const UserExist=await User.findOne({email:email});
        if(!UserExist){
            console.log("User Not Found")
            return res.status(400).send({error:"Wrong Credentials"});
        }
        const isMatch=await bcrypt.compare(password,UserExist.password);
        if(isMatch){
            const token=await UserExist.generateToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
            })
            console.log("Login Success")
            return res.status(200).send({token:token,name:UserExist.name});
        }
        console.log("Wrong Credentials")
        return res.status(400).send({error:"Wrong Credentials"});
    }catch(err){
        console.log("Login Error")
        return res.status(400).send({error:"Failed to SignIn"});
    }
}


const logout=async(req,res)=>{
    console.log("Logout Success")
    res.clearCookie('jwtoken');
    return res.status(200).send({messege:"successfully log out"});
}

module.exports={register,login,logout};