import "./VehicleCard.css";
import "../styles/auth.css";

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
            <h3>
                <span>{vehicle.make} {vehicle.model}</span>
                <span className="badge badge-accent">{vehicle.category}</span>
            </h3>

            <div className="vehicle-details">
                <p>
                    <span>Price</span>
                    <span className="price-tag">₹ {vehicle.price}</span>
                </p>
                <p>
                    <span>Stock</span>
                    <span className={`badge ${vehicle.quantity > 0 ? '' : 'badge-danger'}`} style={{ backgroundColor: vehicle.quantity === 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)' }}>
                        {vehicle.quantity === 0 ? "Out of Stock" : `${vehicle.quantity} Units`}
                    </span>
                </p>
            </div>

            <div className="action-buttons">
                <button
                    className="btn-primary"
                    disabled={vehicle.quantity === 0}
                    onClick={() => onPurchase(vehicle.id)}
                    style={vehicle.quantity === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                >
                    {vehicle.quantity === 0 ? "Out of Stock" : "Purchase"}
                </button>

                {role === "ADMIN" && (
                    <div className="row">
                        <button
                            className="btn-secondary"
                            onClick={() => onEdit(vehicle)}
                        >
                            Edit
                        </button>

                        <button
                            className="btn-warning"
                            onClick={() => {
                                const quantity = prompt("Enter quantity to restock");
                                if (quantity) {
                                    onRestock(vehicle.id, Number(quantity));
                                }
                            }}
                        >
                            Restock
                        </button>

                        <button
                            className="btn-danger"
                            onClick={() => onDelete(vehicle.id)}
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default VehicleCard;