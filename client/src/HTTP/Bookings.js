import {$host} from "@/HTTP/axios.js";


export const getBookings = async () => {
    return await $host.get(`bookings/` );
}







