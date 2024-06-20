import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NaveBar from "./NaveBar"
import { Link } from 'react-router-dom'

export default function Shop() {

const [products, setProducts] = useState([]);

useEffect(()=>{

    fetch("https://zometo-backend-clone-2.onrender.com/api/products")
    .then((e)=>e.json())
    .then((e)=>{
    const Product = e.allpro;
    const shopProducts = Product.filter((x)=> (x.SalerId === userData._id) )
    setProducts(shopProducts);
    })
    .catch((e)=>console.log(e));
},[])


console.log("i am product", products)

    const userData = useSelector((e)=>e.counter.token);
    console.log(userData);



    return (
        <>
        
        <NaveBar/>
    <div className="container mx-auto mt-10 max-w-6xl">
        
        
        {
            userData?.Image_url ? (
                <div >
                <h1 className="text-2xl font-bold mb-5">SHOP</h1>
                <div className=' flex items-center justify-between overflow-hidden gap-3'>
                    <div className=' h-96 w-2/3'>
                    <img className=' object-cover w-full h-full' src={userData.Image_url} alt="" />
                    </div>
                    <div className=' h-96 w-1/3'>
                    <img className=' object-cover w-full h-full' src={products[0]?.Image_url} alt="" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold my-5">{userData.ShopName}</h1>
                <h1 className="text-xl font-extralight text-gray-400">{userData.location}</h1>

                <hr className='my-5' />
                
                    <div className=' text-center p-2 text-xl rounded-md font-bold  bg-red-600 mb-6'>
                    <Link to={"/uplodeProduct"}>
                    <h3>Add Product</h3>
                    </Link>
                    </div>
                    <div className=' text-center p-2 text-xl rounded-md font-bold  bg-red-600 mb-6'>
                    <Link to={`/cart/${userData._id}`}>
                    <h3>Orders</h3>
                    </Link>
                    </div>
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
                                <img src={e.Image_url} alt="" />
                            </div>
                            <div className=' flex items-center justify-between p-3'>
                                <div>
                                    <h3 className='text-xl font-semibold'>{e.Name}</h3>
                                    <div>
                                    <i class="fa-solid fa-indian-rupee-sign"></i>
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
    </>
  )
}

