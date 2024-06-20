import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UserForm = () => {
  const [formData, setFormData] = useState({
    ShopName: '',
    Name: '',
    Price: '',
    Details: '',
    SalerId: '',
    Type: '',
    Rating: '',
    location: '',
    Image: null
  });
  
    const userData = useSelector((e)=>e.counter.token);
    console.log(userData);

    useEffect(()=>{
        if(userData){
            setFormData({
                ...formData,
                ShopName: userData.ShopName,
                SalerId: userData._id,
                location: userData.location,
            })
        }
    },[]);
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      Image: e.target.files[0]
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('https://zometo-backend-clone-2.onrender.com/api/products', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('User created successfully:', response.data);
      navigate("/shop");
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Create User</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700">Shop Name:</label>
          <input
            type="text"
            name="ShopName"
            value={formData.ShopName}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price:</label>
          <input
            type="text"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Details:</label>
          <input
            type="text"
            name="Details"
            value={formData.Details}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Saler ID:</label>
          <input
            type="text"
            name="SalerId"
            value={formData.SalerId}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type:</label>
          <input
            type="text"
            name="Type"
            value={formData.Type}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rating:</label>
          <input
            type="text"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 p-2 border rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            name="Image"
            onChange={handleFileChange}
            className="mt-1 p-2 border rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
