import {$bearer, $host} from "@/HTTP/axios.js";

export const addFav = async (placeId) => {
    let response = await $bearer.post(`favorites`, { placeId: placeId });
    return response;
}

export const removeFav = async (placeId) => {
    let response = await $bearer.delete(`favorites/${placeId}`);
    return response;
};


export const getAllFav = async () => {
    let response = await $host.get(`favorites/`);
    return response;
}
