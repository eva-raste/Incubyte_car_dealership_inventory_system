import { useState } from "react";
import { toast } from "react-toastify";
import { addVehicle, updateVehicle } from "../api/vehicleApi";
import "../styles/auth.css";

function VehicleForm({
    vehicle = null,
    isEdit = false,
    onVehicleAdded
}) {

    const [formData, setFormData] = useState({
        make: vehicle?.make || "",
        model: vehicle?.model || "",
        category: vehicle?.category || "SUV",
        price: vehicle?.price || "",
        quantity: vehicle?.quantity || ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateVehicle(vehicle.id, formData);
                toast.success("Vehicle updated successfully.");
            } else {
                await addVehicle(formData);
                toast.success("Vehicle added successfully.");
            }

            if (!isEdit) {
                setFormData({
                    make: "",
                    model: "",
                    category: "SUV",
                    price: "",
                    quantity: ""
                });
            }

            if (onVehicleAdded) {
                onVehicleAdded();
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation failed."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: "25px", color: "var(--text-main)", textAlign: "left" }}>
                {isEdit ? "Update Vehicle" : "Add Vehicle"}
            </h2>

            <div className="form-grid">
                <div className="input-group">
                    <input
                        className="glass-input"
                        type="text"
                        name="make"
                        placeholder="Make"
                        value={formData.make}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        className="glass-input"
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <select
                        className="glass-input"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="SUV">SUV</option>
                        <option value="SEDAN">SEDAN</option>
                        <option value="HATCHBACK">HATCHBACK</option>
                        <option value="SPORTS">SPORTS</option>
                        <option value="TRUCK">TRUCK</option>
                        <option value="ELECTRIC">ELECTRIC</option>
                    </select>
                </div>

                <div className="input-group">
                    <input
                        className="glass-input"
                        type="number"
                        name="price"
                        placeholder="Price (₹)"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group full-width">
                    <input
                        className="glass-input"
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: "15px" }}>
                {isEdit ? "Update Vehicle" : "Add Vehicle"}
            </button>
        </form>
    );
}

export default VehicleForm;