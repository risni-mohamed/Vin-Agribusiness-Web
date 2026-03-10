import React, { useState } from "react";
import { router, Head } from "@inertiajs/react";
import { FiUser, FiLock } from "react-icons/fi";
import "../../styles/Admin/AdminLogin.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("/admin/login", {
                username,
                password,
            });

            if (response.data.success) {
                router.get("/admin/dashboard");
            } else {
                setError("Invalid Username or Password");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred during login. Please try again.");
            }
        }
    };

    return (
        <div className="admin-login-container">
            <Head title="Admin Login" />

            <div className="login-box">
                <div className="login-header">
                    <h2>Admin Panel</h2>
                    <p>Welcome back! Please login to continue.</p>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <FiUser className="input-icon" />
                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <FiLock className="input-icon" />
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
