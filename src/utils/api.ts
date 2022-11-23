import { BASE_API_URL } from "./constants";

export const getBreeds = (query: string) => {
    return fetch(`${BASE_API_URL}${query}`, { method: 'GET' }).then(response => response.json())
};

