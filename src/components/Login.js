
import React, { useState } from 'react';
import NaveBar from './NaveBar';
import { useParams } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux'
import { token } from '../redux/counter/counterSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const id = useParams()
    let api  = "user/loginu";
    const sid = id.id;
    if(sid === 'S')api = "logins";
    console.log(api);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Email:', email);
        console.log('Password:', password);

        const data = JSON.stringify({
            Username: email ,
            password: password
        })
        
            fetch(`https://zometo-backend-clone-2.onrender.com/api/${api}` , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            })
            .then((e)=> e.json())
            .then((e)=> {

                if(e.token != undefined){
                console.log(e.token,"login successfull")
                tokenExchange(e.token)

            }else alert(" Invelid user")
        })
            .catch((e)=>console.log("not ok"));
    };

    const tokenExchange = async (t) =>{


        
        fetch(`https://zometo-backend-clone-2.onrender.com/api/post/${api}` , {
            method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : t
                },
        })
        .then((e)=> e.json())
        .then((e)=>{
            if(e.data != undefined){
            console.log(e.data , "i am hear");
            dispatch(token(e.data))
            navigate("/");
        }})
        .catch((e)=>console.log(e, "token errer"));

    }

    return (
        <>
        <NaveBar/>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>
        
    );
};

export default Login;

