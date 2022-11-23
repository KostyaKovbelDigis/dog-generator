const addNewField = () => ({ type: 'addNewField' });
const updateCount = (value: number, id: string) => ({ type: 'updateCount', payload: { count: value, id } });
const updateBreed = (value: string, id: string) => ({ type: 'updatedBreed', payload: { breed: value, id } });
const updateSubbreed = (value: string, id: string) => ({ type: 'updateSubbreed', payload: { subbreed: value, id } });

export const userDataAction = { addNewField, updateCount, updateBreed, updateSubbreed }