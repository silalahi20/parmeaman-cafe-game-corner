// // src/components/Auth/LoginForm.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginUser } from '../../api/api';
// import { toast } from 'react-toastify';
// import { useAuth } from './AuthProvider';
// import '../../styles/LoginForm.css';

// function LoginForm() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { login, isAuthenticated } = useAuth();

//     // Redirect if already authenticated
//     useEffect(() => {
//         if (isAuthenticated) {
//             navigate('/home');
//         }
//     }, [isAuthenticated, navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const user = await loginUser(email, password);
//             console.log('Login successful:', user);
//             login(); // Update authentication state
//             toast.success('Login successful!');
//             navigate('/home');
//         } catch (error) {
//             console.error('Login failed:', error.message);
//             toast.error(error.message || 'Login failed!');
//         }
//     };

//     return (
//         <div className="form-container">
//             <h1>Welcome back,</h1>
//             <h1>Login to continue!</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <button type="submit">Log in</button>
//                 <p>Don't have an account? <Link to="/register">Register</Link></p>
//             </form>
//         </div>
//     );
// }

// export default LoginForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/api';
import { useAuth } from './AuthProvider';
import '../../styles/LoginForm.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            login(user.access_token); // Update authentication state and pass token
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };

    return (
        <div className="form-container">
            <h1>Welcome back,</h1>
            <h1>Login to continue!</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Log in</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>
    );
}

export default LoginForm;
