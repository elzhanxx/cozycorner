import {$bearer, $host} from "@/HTTP/axios.js";

export const setReview = async (place, text, rating) => {
    let response = await $bearer.post(`reviews/`, {place: place, text: text, rating: rating});
    return response;
}


export const getPlaceReviews = async (id) => {
    let response = await $host.get(`reviews/${id}`);
    return response;
}
