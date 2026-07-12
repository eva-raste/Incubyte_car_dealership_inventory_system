import { useState } from "react";

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

        <div style={{ marginBottom: "20px" }}>

            <input
                type="text"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
            />

            <input
                type="text"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>

        </div>

    );
}

export default SearchBar;