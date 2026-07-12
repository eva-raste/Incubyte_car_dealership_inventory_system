import { useState } from "react";
import { register } from "../api/authApi";
import "../styles/auth.css";

function Register() {

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

            alert(response.data.message);

            setForm({
                name: "",
                email: "",
                password: ""
            });

        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (
        <div className="auth-container">

            <form className="auth-card" onSubmit={handleSubmit}>

                <h2>Create Account</h2>

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

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

                <button>Create Account</button>

            </form>

        </div>
    );
}

export default Register;