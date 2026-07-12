import { useState } from "react";
import { addVehicle } from "../api/vehicleApi";
import { toast } from "react-toastify";

function VehicleForm({ onVehicleAdded }) {

    const [vehicle, setVehicle] = useState({

        make: "",
        model: "",
        category: "SUV",
        price: "",
        quantity: ""

    });

    const handleChange = (e) => {

        setVehicle({
            ...vehicle,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addVehicle(vehicle);

            toast.success("Vehicle added successfully.");

            setVehicle({
                make: "",
                model: "",
                category: "SUV",
                price: "",
                quantity: ""
            });

            if (onVehicleAdded) {
                onVehicleAdded();
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to add vehicle."
            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Add Vehicle</h2>

            <input
                type="text"
                name="make"
                placeholder="Make"
                value={vehicle.make}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="model"
                placeholder="Model"
                value={vehicle.model}
                onChange={handleChange}
                required
            />

            <select
                name="category"
                value={vehicle.category}
                onChange={handleChange}
            >

                <option value="SUV">SUV</option>
                <option value="SEDAN">SEDAN</option>
                <option value="HATCHBACK">HATCHBACK</option>
                <option value="SPORTS">SPORTS</option>
                <option value="TRUCK">TRUCK</option>
                <option value="ELECTRIC">ELECTRIC</option>

            </select>

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={vehicle.price}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={vehicle.quantity}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Add Vehicle
            </button>

        </form>

    );

}

export default VehicleForm;