import "./VehicleCard.css";

function VehicleCard({
    vehicle,
    onPurchase,
    onEdit
}) {

    return (
        <div className="vehicle-card">

            <h3>
                {vehicle.make} {vehicle.model}
            </h3>

            <p>
                <strong>Category:</strong> {vehicle.category}
            </p>

            <p>
                <strong>Price:</strong> ₹ {vehicle.price}
            </p>

            <p>
                <strong>Quantity:</strong> {vehicle.quantity}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                    marginTop: "15px"
                }}
            >

                <button
                    onClick={() => onEdit(vehicle)}
                >
                    Edit
                </button>

                <button
                    disabled={vehicle.quantity === 0}
                    onClick={() => onPurchase(vehicle.id)}
                >
                    {vehicle.quantity === 0
                        ? "Out of Stock"
                        : "Purchase"}
                </button>

            </div>

        </div>
    );
}

export default VehicleCard;