import { useEffect, useState } from "react";
import { getAllVehicles, purchaseVehicle } from "../api/vehicleApi";
import VehicleCard from "../components/VehicleCard";
import { toast } from "react-toastify";

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

    return(

        <div className="container">

            <h2 style={{marginTop:"20px"}}>
                Available Vehicles
            </h2>

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