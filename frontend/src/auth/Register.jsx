import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";
import { toast } from "react-toastify";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
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
            const response = await register(form);
            toast.success(response.data.message || "Registration Successful");
            setForm({
                name: "",
                email: "",
                password: ""
            });
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="auth-container">
            <form className="glass-panel" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                
                <div className="input-group">
                    <input
                        className="glass-input"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                
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
                
                <button className="btn-primary">Create Account</button>
                
                <div className="form-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;