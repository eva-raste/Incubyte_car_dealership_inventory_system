import { useState } from "react";
import "../styles/auth.css";

function SearchBar({ onSearch }) {

    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSearch = () => {
        onSearch({
            make,
            model,
            category,
            minPrice,
            maxPrice
        });
    };

    return (
        <div>
            <h2 style={{ marginBottom: "20px", color: "var(--text-main)", textAlign: "left" }}>
                Find Your Vehicle
            </h2>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center"
            }}>
                <div style={{ flex: "1 1 150px" }}>
                    <input
                        className="glass-input"
                        type="text"
                        placeholder="Make"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </div>

                <div style={{ flex: "1 1 150px" }}>
                    <input
                        className="glass-input"
                        type="text"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>

                <div style={{ flex: "1 1 150px" }}>
                    <input
                        className="glass-input"
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div style={{ flex: "1 1 120px" }}>
                    <input
                        className="glass-input"
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>

                <div style={{ flex: "1 1 120px" }}>
                    <input
                        className="glass-input"
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <div style={{ flex: "0 0 auto", minWidth: "120px" }}>
                    <button className="btn-primary" style={{ margin: 0, padding: "14px 24px" }} onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;