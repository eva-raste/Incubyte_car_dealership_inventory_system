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

export const addVehicle = async (vehicle) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        "/vehicles",
        vehicle,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateVehicle = async (id, vehicle) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `/vehicles/${id}`,
        vehicle,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteVehicle = async (id) => {

    const token = localStorage.getItem("token");

    return axios.delete(`/vehicles/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

};

export const restockVehicle = async (id,quantity)=>{

    const token = localStorage.getItem("token");

    return axios.post(

        `/vehicles/${id}/restock`,

        {
            quantity
        },

        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }

    );

};