import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: [],
  },

  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

const categoryReducer = categorySlice.reducer;
export default categoryReducer;
