import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import {Cart} from '../Context/context'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'
import {BsCurrencyRupee} from 'react-icons/bs';

const SingleProduct = () => {

  const {state:{products,cart},dispatch,search}=useContext(Cart);

  const transformedProducts=()=>{
    let item=products;
    if(search.order==='Ascending'){
      item=item.sort((a,b)=>a.price-b.price);
    }else if(search.order==='Descending'){
      item=item.sort((a,b)=>b.price-a.price);
    }
    if(search.star>0){
      item=item.filter((a)=>a.star===search.star);
    }
    if(search.search!==''){
      item=item.filter((a)=>a.name.toLowerCase().includes(search.search.toLowerCase()));
    }
    return item;
  }
  
  return (
    <div className='d-flex justify-content-around flex-wrap singleProduct'>
      {transformedProducts().map((ele)=>{
        return (
          <React.Fragment key={ele.id}>
            <Card style={{ width: '18rem',margin:"6px" }} className="productCard">
              <Card.Img variant="top" src={ele.image} />
              <Card.Body>
                <Card.Title>{ele.name}</Card.Title>
                <Card.Title><BsCurrencyRupee></BsCurrencyRupee>{ele.price.split('.')[0]}</Card.Title>
                <Card.Text>
                  {ele.text}
                </Card.Text>
                <Card.Text>
                  {[...Array(ele.star)].map(()=>{
                    return <><AiFillStar></AiFillStar></>
                  })}
                  {[...Array(5-ele.star)].map(()=>{
                    return <><AiOutlineStar></AiOutlineStar></>
                  })}
                </Card.Text>
                  {cart.find((obj)=>obj.id===ele.id)?<Button className="danger" onClick={()=>dispatch({type:"Remove",payload:ele})}>Remove from Cart</Button>:<Button onClick={()=>dispatch({type:"Add",payload:ele})}>Add to Cart</Button>}
              </Card.Body>
            </Card>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default SingleProduct
