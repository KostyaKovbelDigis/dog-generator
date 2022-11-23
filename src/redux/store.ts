import { breedsReducer, userDataReducer } from './features/breeds';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        breeds: breedsReducer,
        userData: userDataReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;