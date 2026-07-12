import { useEffect, useState } from "react";
import {
    getAllVehicles,
    purchaseVehicle,
    searchVehicles
} from "../api/vehicleApi";
import VehicleCard from "../components/VehicleCard";
import VehicleForm from "../components/VehicleForm";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";

function Home() {

    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {

        try {

            const data = await getAllVehicles();

            setVehicles(data);

            setSelectedVehicle(null);

        } catch (error) {

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

            const data = await searchVehicles(cleanedFilters);

            setVehicles(data);

        } catch (error) {

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

    return (

        <div className="container">

            <h2 style={{ marginTop: "20px" }}>
                Available Vehicles
            </h2>

            <VehicleForm
                isEdit={selectedVehicle !== null}
                vehicle={selectedVehicle}
                onVehicleAdded={loadVehicles}
            />

            <SearchBar onSearch={handleSearch} />

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}
            >

                {vehicles.map(vehicle => (

                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onPurchase={handlePurchase}
                        onEdit={handleEdit}
                    />

                ))}

            </div>

        </div>

    );

}

export default Home;