import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
    const [formData, setFormData] = useState({
        ShopName: '',
        Details: '',
        Username: '',
        phone: '',
        password: '',
        Image: null,
        location: '',
    });
    const navication = useNavigate();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'Image' ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await fetch('https://zometo-backend-clone-2.onrender.com/api/saller', {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
                navication("/");

            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Shop Name:
                    <input 
                        type="text" 
                        name="ShopName" 
                        value={formData.ShopName} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Details:
                    <input 
                        type="text" 
                        name="Details" 
                        value={formData.Details} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Username:
                    <input 
                        type="text" 
                        name="Username" 
                        value={formData.Username} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Phone:
                    <input 
                        type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Image:
                    <input 
                        type="file" 
                        name="Image" 
                        onChange={handleChange} 
                        className="mt-1 block w-full text-gray-700"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Location:
                    <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </label>
            </div>
            <button 
                type="submit" 
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    );
};

export default SignInForm;
