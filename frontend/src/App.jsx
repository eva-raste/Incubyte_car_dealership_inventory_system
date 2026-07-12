import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;