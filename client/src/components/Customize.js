import React, { useContext, useEffect, useState } from 'react'
import {Cart} from '../Context/context'
import {AiFillStar} from 'react-icons/ai'
import {AiOutlineStar} from 'react-icons/ai'

const Customize = () => {

    const {search,dispatchSearch}=useContext(Cart);

    const [select,setSelect]=useState("---");

    const order=(e)=>{
        setSelect(e.target.value)
        if(e.target.value==='Ascending'){    
            dispatchSearch({type:'Ascending'});
        }else if(e.target.value==='Descending'){
            dispatchSearch({type:'Descending'});
        }
    }
    const [star,setStar]=useState(0);
    const [find,setFind]=useState("");


    useEffect(()=>{
        star?(dispatchSearch({type:'star',payload:star})):(<></>);
    },[star]);

  return (
      <div className="flex search">
        <label className='clabel flex'>
            <p>
                Search :
            </p>
        <input  value={search.search} onChange={(e)=>{
            setFind(e.target.value)
            dispatchSearch({type:'Search',payload:e.target.value})
        }} type='text' placeholder="Search.." />
        </label>
        <label  className="clabel flex" >
            <p>
                Order :
            </p>
            <select value={search.order} onChange={order}>
                <option>---</option>
                <option>Ascending</option>
                <option>Descending</option>
            </select>
        </label>
        <label className="clabel flex" >
            <p>
                Rating : 
            </p>
            <div>
                {search.star<1?<AiOutlineStar onClick={()=>setStar(1)}/>:<AiFillStar onClick={()=>setStar(1)}/>}
                {search.star<2?<AiOutlineStar onClick={()=>setStar(2)}/>:<AiFillStar onClick={()=>setStar(2)}/>}
                {search.star<3?<AiOutlineStar onClick={()=>setStar(3)}/>:<AiFillStar onClick={()=>setStar(3)}/>}
                {search.star<4?<AiOutlineStar onClick={()=>setStar(4)}/>:<AiFillStar onClick={()=>setStar(4)}/>}
                {search.star<5?<AiOutlineStar onClick={()=>setStar(5)}/>:<AiFillStar onClick={()=>setStar(5)}/>}
            </div>
        </label>
        <button className="clear" onClick={()=>{
            dispatchSearch({type:'Clear'})
            setStar(0);
            setSelect("---")
            setFind("")
        }}>Clear</button>
    </div>
  )
}

export default Customize
