import { configureStore } from '@reduxjs/toolkit';
import bitcoinPriceReducer from '../features/bitcoinPrice/bitcoinPriceSlice';

const store = configureStore({
    reducer: {
        bitcoinPrice: bitcoinPriceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
