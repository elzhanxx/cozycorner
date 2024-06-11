import {$bearer} from "@/HTTP/axios.js";

export const registerUser = async (name, email, password, number) => {
    return await $bearer.post(`user/register`, {name: name, email: email, password: password, number: number});
}

export const loginUser = async (email, password) => {
    let response = await $bearer.post(`user/login`, {email: email, password: password});
    return response;
}

export const getUserInfo = async () => {
    let response = await $bearer.get(`user/profile`);
    return response;
}

export const updateUser = async (formData) => {
    let response = await $bearer.put(`user/update-user/`, formData);
    return response;
}

export const updateUserImg = async (formData) => {
    let response = await $bearer.post(`user/upload-picture/`, formData);
    return response;
}

export const logOut = async () => {
    let response = await $bearer.get(`user/logout`);
    return response;
}

export const deleteUser = async () => {
    let response = await $bearer.delete(`user/delete-user`);
    return response;
}