import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orders } from '../../redux/counter/counterSlice';


export default function AddCount(e) {


const [selsct , setSelect] = useState(1);
const [count , setCount] = useState(0);
const userData = useSelector((s)=>s.counter.token);
    console.log(userData);


const dispatch = useDispatch();



const uplode = ()=>{
    const order = {
        Count: count,
        SalerId: e.products.SalerId,
        Name : e.products.Name,
        Price: e.products.Price,
        CustomerId: userData._id,
        CustomerName: userData.Name,
        Location: userData.Location,
        Status: "panding",
    }
    dispatch(orders(order))
}


  return (
    <div>
                                {
                                    (selsct===1) ? ( <h1 className=' font-bold text-xl p-3 bg-red-500 text-center' onClick={()=>setSelect(2)}>Add to cart</h1>): (selsct===2) ?  (
                                        <div className=' font-bold text-2xl text-center bg-red-500 p-3'>
                                            <span className='cursor-pointer mx-5' onClick={()=>setCount(count+1)}>+</span>
                                            <span>{count}</span>
                                            <span className='cursor-pointer mx-5' onClick={()=>{if(count>0)setCount(count-1)}}>-</span>
                                            <span className='cursor-pointer mx-5' onClick={()=>{
                                                setSelect(3);
                                                uplode();
                                                }}>OK</span>
                                        </div>
                                    ) : (
                                        <div className=' font-bold text-xl p-3 bg-red-500 text-center'>
                                            <span>oredrd</span>
                                        </div>
                                    )

                                }
    </div>
  )
}
