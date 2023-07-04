import React, { useEffect } from 'react'
import SingleProduct from './SingleProduct'
import Customize from './Customize'
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate=useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('auth')){
      toast('Login First', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        }); 
      navigate('/');
    }
  },[])
  
  return (
    <>
      <ToastContainer />
      <div className="flex contain">
          <Customize/>
          <SingleProduct/>
      </div>
    </>  
  )
}

export default Container
