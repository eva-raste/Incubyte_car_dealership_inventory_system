import "./VehicleCard.css";

function VehicleCard({
    vehicle,
    role,
    onPurchase,
    onEdit,
    onDelete,
    onRestock
}) {

    return (

        <div className="vehicle-card">

            <h3>{vehicle.make} {vehicle.model}</h3>

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
                    flexWrap: "wrap",
                    marginTop: "15px"
                }}
            >

                <button
                    disabled={vehicle.quantity === 0}
                    onClick={() => onPurchase(vehicle.id)}
                >
                    {vehicle.quantity === 0
                        ? "Out of Stock"
                        : "Purchase"}
                </button>

                {
                    role === "ADMIN" && (

                        <>
                            <button
                                onClick={() => onEdit(vehicle)}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(vehicle.id)}
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => {

                                    const quantity = prompt(
                                        "Enter quantity to restock"
                                    );

                                    if (quantity) {

                                        onRestock(
                                            vehicle.id,
                                            Number(quantity)
                                        );

                                    }

                                }}
                            >
                                Restock
                            </button>
                        </>

                    )
                }

            </div>

        </div>

    );

}

export default VehicleCard;