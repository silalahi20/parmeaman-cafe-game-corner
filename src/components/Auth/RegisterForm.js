// src/components/Auth/RegisterForm.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/api'; // Update the import path as necessary
import { toast } from 'react-toastify';
import '../../styles/RegisterForm.css';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = await registerUser({ name, email, password });
            console.log('Registration successful:', newUser);
            toast.success('Registration successful!');
            navigate('/login'); // Redirect to login
        } catch (error) {
            console.error('Registration failed:', error.message);
            toast.error(error.message || 'Registration failed!'); // Display error message to the user
        }
    };

    return (
        <div className="form-container">
            <h1>Welcome back,</h1>
            <h1>Register to continue!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}

export default RegisterForm;
