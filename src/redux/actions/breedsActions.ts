type BreedList = {
    [key: string]: string[],
};

export const loadBreeds = (value: BreedList) => ({ type: 'FetchData', payload: value });

export const actionBreeds = { loadBreeds };
