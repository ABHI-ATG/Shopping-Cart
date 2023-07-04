const mongoose=require("mongoose");

const db=process.env.DATABASE;
mongoose.connect(db)
.then(()=>{
    console.log(`Connected db`);
}).catch((err)=>{
    console.log(err);
});


