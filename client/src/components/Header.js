import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {FaShoppingCart} from 'react-icons/fa';
import {Cart} from '../Context/context'
import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import {AiFillCaretDown} from 'react-icons/ai'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import url from './url'

function Header() {
  const navigate=useNavigate();
  const {state}=useContext(Cart);

  const logout=async()=>{
    try{
        const res=await axios.get(`${url}/api/client/logout`,{headers:{
          "Authorization":localStorage.getItem('token'),
          "Content-Type":"application/json",
          "Accept":"application/json"
        }})
       
        if(!res || res.status!==200){
          toast('Logout Failed', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log("Error");
          throw new Error("Logout Failed")
        }else{  
            toast('Logout Successful', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            localStorage.clear();
            navigate('/');
        }
    }catch(err){
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
    <Navbar expand="lg" className="bg-body-tertiary header Menu">
      <Container className='d-flex justify-content-around'  fluid>
        <Link className='link' to='/'><AiOutlineShoppingCart className='m-1'></AiOutlineShoppingCart>Shopping Cart</Link>
        <Link className='link' to='/cart'>
        <span className='flex'>
          <FaShoppingCart/>
          <span>
            <AiFillCaretDown></AiFillCaretDown>
          </span>
          <span>
            {state.cart.length}
          </span>
        </span>
        </Link>
        {localStorage.getItem('auth')?
        <div className='logout' onClick={logout}>Logout</div>
        :<></>
        }
      </Container>
    </Navbar>
    </>
  );
}

export default Header;