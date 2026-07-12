import axios from "./axiosConfig";

export const getAllVehicles = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get("/vehicles", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const purchaseVehicle = async (id) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `/vehicles/${id}/purchase`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const searchVehicles = async (params) => {

    const token = localStorage.getItem("token");

    const response = await axios.get(
        "/vehicles/search",
        {
            params,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};