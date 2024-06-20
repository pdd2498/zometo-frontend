import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";


export default function Cart() {
    const [order , setOrder] = useState();
    const sallerId = useParams()
    const body = sallerId.SallerId;
useEffect(()=>{
    try{
        fetch("https://zometo-backend-clone-2.onrender.com/api/orders", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : body,
            },
        })
        .then((e)=>e.json())
        .then((e)=>setOrder(e.allpro));

    }
    catch(err){
        console.log(err);
    };
},[])

console.log(order);



  
    const handleDelivery = async (id) => {

        await axios.put(`https://zometo-backend-clone-2.onrender.com/api/orders/${id}`, {
            Status: "Deliverd",
          });

        setOrder(order.map(order =>
        order._id === id ? { ...order, Status: "Deliverd" } : order
      ));
    };

    const handleDelete = async (id) => {

      await axios.put(`https://zometo-backend-clone-2.onrender.com/api/orders/${id}`, {
        Status: "Delete",
      }).then(()=>{
        try{
          fetch("https://zometo-backend-clone-2.onrender.com/api/orders", {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : body,
              },
          })
          .then((e)=>e.json())
          .then((e)=>setOrder(e.allpro));
  
      }
      catch(err){
          console.log(err);
      };
    })

    setOrder(order.map(order =>
    order._id === id ? { ...order, Status: "Delete" } : order
  ));
    };


  return (
    <div className=' flex items-center justify-center gap-4 flex-wrap'>
        {
          order ? (order.map((order)=>{
            return(
                <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
                    <div className="mb-4">
                    <h2 className="text-xl font-bold">Order Name: {order.Name}</h2>
                    <h2 className="text-xl font-bold">Quantity: {order.Count}</h2>
                    <p className="text-gray-700">Location: {order.Location}</p>
                    <p className="text-gray-700">Name: {order.CustomerName}</p>
                    <p className="text-gray-700">Price: ₹{order.Price}</p>
                    </div>
                    <div>
                    {
                    order.Status === "panding" ? (
                                            <button onClick={() => handleDelivery(order._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                            Delivered
                                            </button> ) : 
                                            order.Status === "Deliverd" ? (
                                            <div className="bg-orange-700 text-white font-bold py-2 px-4 rounded text-center">
                                            On Delivery
                                            </div> ) : 
                                            (
                                                <button onClick={() => handleDelete(order._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                Order Complite
                                                </button> 
                                        )}
                    </div>
                   
                </div>
            )
          })  ):(
            <h1>No Orders</h1>
           )
        }
    </div>
  )
}
