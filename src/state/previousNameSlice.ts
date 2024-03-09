import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PreviousNameState {
  value: string;
}

const initialState: PreviousNameState = {
  value: '',
};

const previousNameSlice = createSlice({
  name: 'previousName',
  initialState,
  reducers: {
    setPreviousName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setPreviousName } = previousNameSlice.actions;
export default previousNameSlice.reducer;
