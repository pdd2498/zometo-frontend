import logo from './logo.svg';
import './App.css';
import NaveBar from './components/NaveBar';
import Login from './components/Login';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import UserSingIn from "./components/UserSingIn"
import SallerSignIn from "./components/SallerSignIn"
import Shop from './components/Shop';
import UplodeProducts from "./components/UplodeProducts"
import CartPage from './components/Cart';
import ShopProducts from './components/ShopProducts';



function App() {

  const routes = createBrowserRouter([
    {
      path:'/',
      Component:Home,
    },
    {
      path: "/login/:id",
      Component: Login,
    },
    {
      path: "/signin/U",
      Component: UserSingIn,
    },
    {
      path:"/signin/S",
      Component: SallerSignIn,
    },
    {
      path:"/shop",
      Component: Shop,
    },
    {
      path:"/uplodeProduct",
      Component: UplodeProducts
    },
    {
      path:"/cart/:SallerId",
      Component: CartPage
    },
    {
      path: "/shopproducts/:SallerId",
      Component: ShopProducts,
    }

  ])
  return (
    <>
    
    <RouterProvider router={routes}/>
    </>
    
    
  );
}

export default App;
