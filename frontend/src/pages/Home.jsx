import { useEffect, useState } from "react";
import {
    getAllVehicles,
    purchaseVehicle,
    searchVehicles,
    deleteVehicle,
    restockVehicle
} from "../api/vehicleApi";

import VehicleCard from "../components/VehicleCard";
import VehicleForm from "../components/VehicleForm";
import SearchBar from "../components/SearchBar";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

import { toast } from "react-toastify";

function Home() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const role = localStorage.getItem("role");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            navigate("/login");
        } else {
            setUsername(storedUsername);
        }
        loadVehicles();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const loadVehicles = async () => {

        try {

            const data = await getAllVehicles();

            setVehicles(data);

            setSelectedVehicle(null);

        } catch {

            toast.error("Unable to load vehicles.");

        }

    };

    const handlePurchase = async (id) => {

        try {

            await purchaseVehicle(id);

            toast.success("Vehicle purchased successfully.");

            loadVehicles();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Purchase failed."
            );

        }

    };

    const handleSearch = async (filters) => {

        try {

            const cleanedFilters = {};

            Object.keys(filters).forEach(key => {

                if (filters[key] !== "") {

                    cleanedFilters[key] = filters[key];

                }

            });

            const data =
                await searchVehicles(cleanedFilters);

            setVehicles(data);

        } catch {

            toast.error("Search failed.");

        }

    };

    const handleEdit = (vehicle) => {

        setSelectedVehicle(vehicle);

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

    const handleDelete = async (id) => {

        try {

            await deleteVehicle(id);

            toast.success("Vehicle deleted.");

            loadVehicles();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Delete failed."
            );

        }

    };

    const handleRestock = async (id, quantity) => {

        try {

            await restockVehicle(id, quantity);

            toast.success("Vehicle restocked.");

            loadVehicles();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Restock failed."
            );

        }

    };

    return (
        <div className="container" style={{ padding: "40px 20px" }}>
            <div className="glass-panel" style={{ 
                maxWidth: "100%", 
                marginBottom: "30px", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "20px 40px"
            }}>
                <div>
                    <h2 style={{ margin: 0 }}>Hello, <span style={{ color: "var(--accent-primary)" }}>{username}</span>!</h2>
                    <p style={{ color: "var(--text-muted)", marginTop: "5px" }}>Welcome to your personalized dashboard.</p>
                </div>
                <button className="btn-primary" onClick={handleLogout} style={{ width: "auto", padding: "10px 30px", margin: 0 }}>
                    Logout
                </button>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h2 style={{ color: "var(--text-main)" }}>Available Vehicles</h2>
            </div>

            {role === "ADMIN" && (
                <div className="glass-panel" style={{ maxWidth: "100%", marginBottom: "30px" }}>
                    <VehicleForm
                        isEdit={selectedVehicle !== null}
                        vehicle={selectedVehicle}
                        onVehicleAdded={loadVehicles}
                    />
                </div>
            )}

            <div className="glass-panel" style={{ maxWidth: "100%", marginBottom: "30px", padding: "20px" }}>
                <SearchBar onSearch={handleSearch} />
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {vehicles.map(vehicle => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        role={role}
                        onPurchase={handlePurchase}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onRestock={handleRestock}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;