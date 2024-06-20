import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Name , setName] = useState('');
    const [Phone , setPhone] = useState('');
    const [Location , setLocation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === ''|| Name === '' || Location === '') {
            setError('Both fields are required.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        // Proceed with form submission (e.g., send data to server)
        const formData = JSON.stringify({
            Name: Name,
            Phone: Phone,
            Username: username,
            password: password,
            Location: Location
        })
        try {
            const response = await fetch('https://zometo-backend-clone-2.onrender.com/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            alert('Form submitted successfully!');
            console.log(result);
        } catch (error) {
            setError('Failed to submit form: ' + error.message);
        }
        alert('Form submitted successfully!');
        navigate("/")
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <h2 className="mb-6 text-2xl font-bold text-center">Sign In</h2>
                    {error && <div className="mb-4 text-red-600">{error}</div>}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Name:</label>
                        <input
                            type="text"
                            id="Name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">Phone No.:</label>
                        <input
                            type="number"
                            id="Number"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">Location:</label>
                        <input
                            type="text"
                            id="Location"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={Location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-3 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
