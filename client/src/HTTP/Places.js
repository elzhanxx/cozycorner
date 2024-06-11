import {$bearer, $host} from "@/HTTP/axios.js";

export const getAllMainPagePlaces = async (val) => {
    if(val){
        return await $bearer.get(`mainpage/` );
    }
    return await $host.get(`mainpage/` );

}

export const getAllPlaces = async () => {
    return await $host.get(`places/` );
}

export const getFilteredPlaces = async (area, rooms, currentPage, perks) => {
    let query = `places/filtered-places?currentPage=${currentPage}`;

    if (area !== '') {
        query += `&area=${area}`;
    }

    if (rooms !== null) {
        query += `&rooms=${rooms}`;
    }

    if (perks.length > 0) {
        query += `&perks=${perks.join(',')}`;
    }

    return await $host.get(query);
}

export const addNewPlace = async (title, address, photos, description, perks, extraInfo, maxGuests, price, area, rooms) => {

    return await $host.post(`places/add-places`, {title: title, address: address, photos: photos, description: description, perks: perks, extraInfo: extraInfo, maxGuests: maxGuests, price: price, area: area, rooms: rooms} );
}

export const getUserPlaces = async () => {
    return await $host.get(`places/user-places` );
}

export const getPlacesSearch = async (value) => {
    return await $host.get(`places/search/${value}` );
}

export const getPlaceById = async (id) => {
    return await $host.get(`places/${id}` );
}

export const updateNewPlace = async (formData) => {

    return await $host.put(`places/update-place`, formData );
}

export const getUserIsNowBooking = async (id) => {
    return await $host.get(`places/check-booking/${id}` );
}

export const getBookings = async () => {
    return await $host.get(`bookings/` );
}








