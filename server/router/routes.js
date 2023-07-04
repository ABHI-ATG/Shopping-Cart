const router=require("express").Router();

const authenticate=require('../middleware/authenicate');
const {register,login,logout} =require('../Controller/controller')

router.route('/register').post(register);

router.post('/login',login);

router.get('/logout',authenticate,logout)


module.exports=router;