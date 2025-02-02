import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const history = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/login', userData);
            localStorage.setItem('user', JSON.stringify(response.data.user));  // Store user data in localStorage
            history.push('/home');  // Redirect to homepage after successful login
        } catch (error) {
            setErrorMessage('Invalid credentials');
        }
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;