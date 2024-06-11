import { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';
import { PlaceContext } from '@/providers/PlaceProvider';
import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';


export const useAuth = () => {
    return useContext(UserContext)
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = getItemFromLocalStorage('token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])

    return {
        user,
        setUser,
    }
}


export const usePlaces = () => {
    return useContext(PlaceContext);
};

export const useProvidePlaces = () => {
    const [place, setPlace] = useState(null);


    return {
        place,
        setPlace,
    };
};