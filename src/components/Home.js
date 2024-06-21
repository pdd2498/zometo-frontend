import React, { useEffect, useState } from 'react'
import NaveBar from './NaveBar'
import { incrisr, decrice , token } from '../redux/counter/counterSlice'
import { useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Footer from './Footer';


export default function Home() {

  const [products, setProducts] = useState([]);
  const sc = useSelector((s)=>s.counter.search);
  let data = ''

useEffect(()=>{

  fetch("https://zometo-backend-clone-2.onrender.com/api/products")
  .then((e)=>e.json())
  .then((e)=>{
    data = e.allpro;
    const filter = data.filter((e) => {
      return e.Name.includes(sc);
    });
    setProducts(filter);
    })
  .catch((e)=>console.log(e));
  

},[sc]);





  // const count = useSelector((s)=>s.counter.value);
  // const dispatch = useDispatch();

  return (
    <div>
        <NaveBar/>
        <div className="container mx-auto mt-10 max-w-6xl mb-32">
      <h1 className="text-2xl font-bold mb-5">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
        products[0]?( products.map(product => (
          <Link to={`/shopproducts/${product.SalerId}`}>
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={`${product.Image_url}`} alt={product.Name} className="w-full h-48 object-cover mb-4 rounded" />
              <h2 className="text-xl font-bold mb-2">{product.Name}</h2>
              <p className="text-gray-700 mb-2">{product.ShopName}</p>
              <p className="text-gray-700 mb-2">{product.Price}</p>
              <p className="text-gray-700 mb-2">{product.Details}</p>
              <p className="text-gray-700 mb-2">{product.Type}</p>
              <p className="text-gray-700 mb-2">Rating: {product.Rating || 'N/A'}</p>
              <p className="text-gray-700 mb-2">Location: {product.location || 'N/A'}</p>
              </div>
          </Link>
          
        ))):(
          <div>

          </div>
        )}
      </div>

    </div>
    <Footer/>
    </div>
  )
}
