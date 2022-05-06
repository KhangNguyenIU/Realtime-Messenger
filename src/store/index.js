import { configureStore } from '@reduxjs/toolkit';
import reducers from 'slices';

const store = configureStore({ reducer: reducers, devTools: true });

export default store;
