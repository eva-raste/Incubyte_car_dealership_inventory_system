import axios from "axios";

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://incubyte-car-dealership-inventory-system-ppew.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});