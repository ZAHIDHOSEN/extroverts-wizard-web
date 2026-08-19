import { configureStore, } from '@reduxjs/toolkit';
import signupReducer from './signupSlice';


// const testSlice = createSlice({
//   name: 'test',
//   initialState: { message: 'Redux is working!' },
//   reducers: {},
// });

export const store = configureStore({
  reducer: {
    test: signupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;