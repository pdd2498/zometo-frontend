import { useState } from "react"
import { NavLink , Link } from "react-router-dom"
import { incrisr, decrice , token , search } from '../redux/counter/counterSlice'
import { useSelector , useDispatch } from 'react-redux'

export default function NaveBar() {
    const [user , setUser] = useState("U");
    

    const userData = useSelector((s)=>s.counter.token);
    const sc = useSelector((s)=>s.counter.search);
    console.log(userData);


    const Dispatch = useDispatch();
  return (
    <div>
        <nav className="navbar">
        <div className="navbar-container">
            <div className="logo">
                <NavLink to='/'>
                     <img className=' max-w-56 h-11 ' src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="" />
                </NavLink>
            </div>
            <div className="search-bar">
                <input type="text" value={sc} onChange={(e)=>Dispatch(search(e.target.value))} placeholder="Search..."/>
            </div>
            {/* <div className="location">
                <select>
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                    <option value="location3">Location 3</option>
                </select>
            </div> */}
            {
            userData ? (
                <div className="menu flex items-center justify-between w-64">
                    <h3>{userData.ShopName}</h3>
                    <img src={userData.Image} alt="" />
                    <div>
                    {
                    userData.Details ? (
                        <Link to={"/shop"}>
                         <button className=" text-lg p-2 font-semibold">Sohp</button>
                        </Link>
                       
                    ):(
                        <div className=" flex items-center gap-2 justify-between">
                            <h3>{userData.Name}</h3>
                            <img className=" w-10 h-10 rounded-full" src={user.image ? user.image : "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_1280.png"} alt="User" />
                        </div>
                    )

                    }
                    </div>
                    </div>
                    
            ):(
                <div className="menu flex items-center justify-between w-64">
                    <select onChange={(e)=> setUser(e.target.value)}>
                            <option value="U">User</option>
                            <option value="S">Saller</option>
                        </select>
                            <Link to={`/login/${user}`}>
                            <span className=" text-lg p-2 font-semibold">Log in</span>
                            </Link>
                        
                        <NavLink to={`/signin/${user}`}>
                        <span className=" text-lg p-2 font-semibold">sign in</span>
                        </NavLink>
                    </div>
            )
        }
            
        </div>
    </nav>
    </div>
  )
}
