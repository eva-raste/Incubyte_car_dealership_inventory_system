import { useEffect, useState } from "react";
import { getAllVehicles, purchaseVehicle } from "../api/vehicleApi";
import VehicleCard from "../components/VehicleCard";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import { searchVehicles } from "../api/vehicleApi";
import VehicleForm from "../components/VehicleForm";


function Home() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {

        loadVehicles();

    }, []);

    const loadVehicles = async () => {

        try{

            const data = await getAllVehicles();

            setVehicles(data);

        }catch(error){

            toast.error("Unable to load vehicles.");
        }
    };

    const handlePurchase = async(id)=>{

        try{

            await purchaseVehicle(id);

            toast.success("Vehicle purchased successfully.");

            loadVehicles();

        }catch(error){

            toast.error(error.response?.data?.message ||
                "Purchase failed.");
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

    return(

        <div className="container">

            <h2 style={{marginTop:"20px"}}>
                Available Vehicles
            </h2>
        
            <VehicleForm
                onVehicleAdded={loadVehicles}
            />
            
            <SearchBar onSearch={handleSearch} />

            <div
                style={{
                    display:"flex",
                    flexWrap:"wrap"
                }}
            >

                {
                    vehicles.map(vehicle=>(

                        <VehicleCard

                            key={vehicle.id}

                            vehicle={vehicle}

                            onPurchase={handlePurchase}

                        />

                    ))
                }

            </div>

        </div>

    );

}

export default Home;