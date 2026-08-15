import { configureStore, createSlice } from '@reduxjs/toolkit';

const testSlice = createSlice({
  name: 'test',
  initialState: { message: 'Redux is working!' },
  reducers: {},
});

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;