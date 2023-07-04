import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import axios from 'axios'

const Signin=()=>{
    const navigate=useNavigate();
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    const [isLoading,setIsLoading]=useState(false)

    const loginUser=async(e)=>{
      e.preventDefault();
      setIsLoading(true)
      try {
        if(!email || !password){
          toast('Invalid Credentials', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
            setTimeout(()=>{
              setIsLoading(false)
            },1000)
            return;
        }
        const data=await axios.post('http://localhost:5000/api/client/login',{
          email:email,password:password
        },{
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          }
        })
        if(data.status!==200 || !data){
          toast('Invalid Credentials', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
            setTimeout(()=>{
              setIsLoading(false)
            },1000)
        }else{
          toast('Login Successful', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            }); 
          localStorage.setItem("auth","yes");
          localStorage.setItem("name",data.data.name);
          localStorage.setItem("token",data.data.token);
          setIsLoading(false)
          navigate('/home');
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
          setTimeout(()=>{
            setIsLoading(false)
          },1000)
      }
    }

    const run=async(e)=>{
      e.preventDefault()
      setIsLoading(true)
      try {
        const data=await axios.post('http://localhost:5000/api/client/login',{
          email:"guest@gmail.com",password:"guest"
        },{
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          }
        })
        toast('Login Successful', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          }); 
        localStorage.setItem("auth","yes");
        localStorage.setItem("name",data.data.name);
        localStorage.setItem("token",data.data.token);
        setTimeout(()=>{
          setIsLoading(false)
        },1000)
        navigate('/home');
        
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
          setTimeout(()=>{
            setIsLoading(false)
          },1000)
      }
    }

    return (
        <>
        <ToastContainer />
            <div className="flex">
                <form method="POST" className="flex flex-column">
                  <div className="form-group flex">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={(e)=>{
                      setEmail(e.target.value);
                    }}/>
                  </div>
                  <div className="form-group flex">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className="form-group flex">
                    <input type="submit" className="form-submit m-2" id="signup" value="SignIn" onClick={loginUser}/>
                    <button onClick={run}>SignIn Guest</button>
                  </div>
                    {isLoading && <div>Loading...</div>}
                </form>
              </div>
        </>
    )
}

export default Signin;