import {   useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';


const Signup=()=>{

  

    const navigate=useNavigate();
    const [user,setUser]=useState({
      name:"",email:"",password:"",cpassword:""
    })

    const setHandle=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setUser({...user,[name]:value})
    }

    const postData=async (e)=>{
      e.preventDefault();

      const {name,email,password,cpassword}=user;
      if(password!==cpassword){
        toast('Password Does Not Match', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }

      try {
        const res=await axios.post('http://localhost:5000/api/client/register',{
          name,email,password
        },{headers:{
          "Content-Type":"application/json"
        }})
        if(!res || res.status!==200){
          toast('Account Already Exist', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }else{
          toast('Registered Successful! Login To Continue', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setUser({
            name:"",email:"",password:"",cpassword:""
          });
          navigate('/');
        }
      } catch (error) {
        toast('Please Try Again', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });  
      }
    }
  
    return (
        <>
        <ToastContainer />
         <div className="flex box flex2">
            <form method="POST">
              <div className="form-group flex">
                <label htmlFor="name">
                    <i className="zmdi zmdi-account"></i>
                </label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" value={user.name} name="name" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={user.email} name="email" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label htmlFor="password"><i className="zmdi zmdi-shield-security"></i></label>
                <input type="password" className="form-control" id="password" placeholder="Password" value={user.password} name="password" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label htmlFor="cpassword"><i className="zmdi zmdi-shield-security"></i></label>
                <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" value={user.cpassword} name="cpassword" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <input type="submit" className="form-submit" id="signup" value="SignUp" onClick={postData}/>
              </div>
            </form>
         </div>

        </>
    )
}

export default Signup;