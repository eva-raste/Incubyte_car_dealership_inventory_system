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
            
            // Save token and user name
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
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button>Login</button>
                <p style={{ marginTop: "15px", textAlign: "center", color: "#666" }}>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;