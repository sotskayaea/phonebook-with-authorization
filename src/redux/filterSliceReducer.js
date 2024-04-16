import { createSlice } from '@reduxjs/toolkit';

export const filterSliceReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterValue: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { filterValue } = filterSliceReducer.actions;
