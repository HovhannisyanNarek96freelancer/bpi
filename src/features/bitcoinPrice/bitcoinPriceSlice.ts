import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchBP } from "./api";

interface BitcoinPriceState {
    data: any;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const initialState: BitcoinPriceState = {
    data: {},
    status: 'idle',
};

export const fetchBitcoinPrice = createAsyncThunk(
    'bitcoinPrice/fetchBitcoinPrice',
    async () => {
        const response = await fetchBP();
        return response;
    }
);

const bitcoinPriceSlice = createSlice({
    name: 'bitcoinPrice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBitcoinPrice.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBitcoinPrice.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchBitcoinPrice.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default bitcoinPriceSlice.reducer;
