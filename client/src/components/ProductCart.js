import React, { useContext, useEffect, useState } from 'react'
import {Cart} from '../Context/context'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillDelete} from 'react-icons/ai'
import {BsCurrencyRupee} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';

const ProductCart = () => {

  const {state,dispatch}=useContext(Cart);
  const navigate=useNavigate();

  const totalPrice=()=>{ 
    let num=0;
    state.cart.map((ele)=>{
      num+=parseInt(ele.price)*parseInt(ele.quantity);
    })
    return num;
  }

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
    <div className='carts flex'>
      <ToastContainer />
      <div className='flex cart2'>
      {state.cart.map((ele)=>{
        return (
          <>
          <Card key={ele.id} className="text-center cartCard flex">
            <img variant="top" src={ele.image} />
            <Card.Body className=''>
            <Card.Title>{ele.name}</Card.Title>
              <Card.Text><BsCurrencyRupee></BsCurrencyRupee>{ele.price.split('.')[0]}</Card.Text>
              <Card.Text>
                Quantity : {ele.quantity}
              </Card.Text>
              <Button className="danger" onClick={()=>dispatch({type:"Remove",payload:ele})}><AiFillDelete></AiFillDelete></Button>
              <Button className='m-1' onClick={()=>dispatch({type:"Quantity",payload:ele})}>+</Button>
            </Card.Body>
        </Card>
        </>
        )
      })}
    </div>
    <div className='flex cardDetails'>
      <p>
        Your order is eligible for FREE Delivery. Select this option at checkout. Details
      </p>
      <p>Total Items : {state.cart.length}</p>
      <p>
        Total : {totalPrice()}
      </p>
      <button>Proceed To Buy</button>
    </div>
    </div>
  )
}

export default ProductCart;
