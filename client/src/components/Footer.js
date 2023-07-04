import React from 'react'
import {AiOutlineShoppingCart} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className="footer flex">
      <div className='flex footerTop'>
        <div>
          <h5>Get to Know Us</h5>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Release</p>
        </div>
        <div>
          <h5>Connect With Us</h5>
          <p>Whatsapp</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
        <div>
          <h5>Make Money With Us</h5>
          <p>Sell on Shopping Cart</p>
          <p>Become an Affliate</p>
          <p>Advertise Your Product</p>
        </div>
      </div>
      <div className='flex footerBottom'>
        <h6><AiOutlineShoppingCart className='m-1'></AiOutlineShoppingCart>Shopping Cart</h6>
        <p>Copyright © 2023 Shopping Cart Inc. All rights reserved</p>
      </div>
    </div>
    
  )
}

export default Footer
