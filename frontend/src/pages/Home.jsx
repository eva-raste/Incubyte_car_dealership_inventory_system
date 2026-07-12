import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Home() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            navigate("/login");
        } else {
            setUsername(storedUsername);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-card" style={{ textAlign: "center", padding: "40px" }}>
                <h2>Hello, {username}!</h2>
                <p style={{ marginTop: "10px", marginBottom: "30px", color: "#666" }}>
                    Welcome to the home page.
                </p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;
