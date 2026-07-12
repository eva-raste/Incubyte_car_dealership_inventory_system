import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(form);
            toast.success(response.data.message || "Login Successful");
            
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.name || form.email);
            
            setForm({
                email: "",
                password: ""
            });
            navigate("/home");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="glass-panel" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                
                <div className="input-group">
                    <input
                        className="glass-input"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                
                <div className="input-group">
                    <input
                        className="glass-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                
                <button className="btn-primary">Login</button>
                
                <div className="form-footer">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;