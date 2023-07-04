const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

userSchema.pre('save',async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next(); 
})

userSchema.methods.generateToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        return token;
    }catch(err){
        console.log(err);
    }
}

const user=mongoose.model("User",userSchema);

module.exports=user;