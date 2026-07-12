import "./VehicleCard.css";

function VehicleCard({ vehicle, onPurchase }) {

    return (
        <div className="vehicle-card">

            <h3>{vehicle.make} {vehicle.model}</h3>

            <p><strong>Category:</strong> {vehicle.category}</p>

            <p><strong>Price:</strong> ₹ {vehicle.price}</p>

            <p><strong>Quantity:</strong> {vehicle.quantity}</p>

            <button
                disabled={vehicle.quantity === 0}
                onClick={() => onPurchase(vehicle.id)}
            >
                {vehicle.quantity === 0
                    ? "Out of Stock"
                    : "Purchase"}
            </button>

        </div>
    );
}

export default VehicleCard;