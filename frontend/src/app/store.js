import {configureStore} from '@reduxjs/toolkit';
import {reducers} from '../features/pdfSlice.js';


export const store = configureStore({
    reducer:reducers,
});
export default store;