 import React, { createContext, useEffect, useReducer, useState } from 'react';
import App from '../App';
import {faker} from '@faker-js/faker'
import {reducer,reducerSearch} from './Reducer'

const Cart = createContext();
faker.seed(1000);

const products=[...Array(20)].map(()=>{
  return ({
    id:faker.database.mongodbObjectId(),
    name:faker.commerce.productName(),
    price:faker.commerce.price(),
    text:faker.lorem.sentence({min:10,max:18}),
    image:faker.image.urlLoremFlickr({ category: 'abstract' }),
    star:faker.number.int({min:1,max:5}),
    quantity:1
  })
})


const Context = () => {
  

  const [cart,setCart]=useState([]);

  
  const [state, dispatch] = useReducer(reducer,{products,cart})
  const [search,dispatchSearch] = useReducer(reducerSearch,{
    order:"",
    star:0,
    search:""
  });


  return (
    <>
      
      <Cart.Provider value={{state,dispatch,search,dispatchSearch}}>
        <App/>
      </Cart.Provider>
     
    </>
      
  )
};

export {Context,Cart};