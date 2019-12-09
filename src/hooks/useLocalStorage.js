import { useState } from 'react';

export const useLocalStorage = (key) => {
    const [cart, setCart] = useState(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : []
    });

    const setValue = value => {
        setCart(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    return [cart, setValue]
}