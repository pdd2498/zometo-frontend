import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NaveBar from "./NaveBar"
import { Link, useParams } from 'react-router-dom'
import AddCount from './acids/AddCount';
import axios from 'axios';
import Footer from './Footer';

export default function ShopProducts() {

const [products, setProducts] = useState([]);
const [orderStatus , serOrderStatus] = useState('');
const SallerId = useParams().SallerId
const [id , setid] = useState('');

useEffect(()=>{

    fetch("https://zometo-backend-clone-2.onrender.com/api/products")
    .then((e)=>e.json())
    .then((e)=>{
    const Product = e.allpro;
    const shopProducts = Product.filter((x)=> (x.SalerId === SallerId) )
    setProducts(shopProducts);
    })
    .catch((e)=>console.log(e));

    orderStatu();
},[])



    const userData = useSelector((e)=>e.counter.token);
    let selecter = useSelector((e)=>e.counter.orders);

    let totalCount = selecter.reduce((accumulator, current) => accumulator + current.Count, 0);
    let totalPrice = selecter.reduce((accumulator, current) => accumulator + current.Price*current.Count, 0);


    const orderPlaced = ()=>{
        try{
            const data = JSON.stringify(selecter)
            fetch("https://zometo-backend-clone-2.onrender.com/api/orders" ,  {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            })
            .then((e)=>{
                serOrderStatus("panding");
                orderStatu()
            })

        }
        catch(err){
            console.log(err);
        };
    }

console.log("user data" , orderStatus)


    const orderStatu = () =>{
        try{
            fetch("https://zometo-backend-clone-2.onrender.com/api/orders/user", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : userData.Name,
                },
            })
            .then((e)=>e.json())
            .then((e)=>{
                if(e != null){
                serOrderStatus(e?.allpro?.Status);
                setid(e?.allpro?._id);
                if(selecter.length === 0 ){
                    totalCount = e?.allpro?.Count;
                    totalPrice = e?.allpro?.Count;
                }}
                console.log(orderStatus , "i am ");
            });
    
        }
        catch(err){
            console.log(err);
        };
    }


    const ExpectedDelivery = async ()=>{
        serOrderStatus('');
        await axios.put(`https://zometo-backend-clone-2.onrender.com/api/orders/${id}`, {
            Status: "",
          });
    };

    return (
        <>
        
        <NaveBar/>
    <div className="container mx-auto mt-10 max-w-6xl mb-32">
        
        
        {
             products[0]  ? (
                <div >
                <h1 className="text-2xl font-bold mb-5">SHOP</h1>
                <div className=' flex items-center justify-between overflow-hidden gap-3'>
                    <div className=' h-96 w-2/3'>
                    <img className=' object-cover w-full h-full' src={ products[0]?.Image_url} alt="" />
                    </div>
                    <div className=' h-96 w-1/3'>
                    <img className=' object-cover w-full h-full' src={products[0]?.Image_url} alt="" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold my-5">{ products[0]?.ShopName}</h1>
                <h1 className="text-xl font-extralight text-gray-400">{ products[0]?.location}</h1>

                <hr className='my-5' />
                
                {

    orderStatus === '' || orderStatus === undefined  ? (
        <div 
            onClick={orderPlaced} 
            className='cursor-pointer gap-32 flex items-center justify-between p-2 text-xl rounded-md font-bold bg-red-600 mb-6'
        >
            <span>Total Products : {totalCount}</span>
            <h3>Orders</h3>
            <span>Total Amount : {totalPrice}</span>
        </div>
    ) : orderStatus === "panding" ? (
        <div 
            className='cursor-pointer gap-32 flex items-center justify-between p-2 text-xl rounded-md font-bold bg-green-600 mb-6'
        >
            <span>Total Products : {totalCount}</span>
            <h3>On the way</h3>
            <span>Total Amount : {totalPrice}</span>
        </div>
    ) : orderStatus === "Deliverd" ? (
        <div 
            onClick={ExpectedDelivery} 
            className='cursor-pointer gap-32 flex items-center justify-between p-2 text-xl rounded-md font-bold bg-green-600 mb-6'
        >
            {/* <span>Total Products : {totalCount}</span> */}
            <h3>Accept Order</h3>
            {/* <span>Total Amount : {totalPrice}</span> */}
        </div>
    ) : (
        <div></div>
    )
}
                    
                </div>
            ):(
                <div></div>
            )
        }
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
            products[0] ? (products.map((e)=>{
                return(
                        <div className=' border shadow-sm rounded-md'>
                            <div>
                                <img className=' w-full h-80 overflow-hidden' src={e.Image_url} alt="" />
                            </div>
                            <div className=' flex items-center justify-between p-3'>
                                <div>
                                    <h3 className='text-xl font-semibold'>{e.Name}</h3>
                                    <div>
                                    <i className="fa-solid fa-indian-rupee-sign"></i>
                                    <span className=' font-semibold'> {e.Price}</span>
                                    </div>
                                    
                                </div>
                                <div>
                                    <p className=' font-semibold'>{e.Type}</p>
                                    <div>
                                    <i class="fa-solid fa-star"></i>
                                    <span className=' font-semibold'>  {e.Rating}</span>
                                    </div>
                                </div>
                            </div>
                            <AddCount products={e}/>

                        </div>
            )})
                
            ) : (
                <div>
                    <h1>no product </h1>
                </div>
            )
        }
        </div>
        
    </div>
    <Footer/>
    </>
  )
}

