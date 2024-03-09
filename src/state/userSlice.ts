import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define UserType interface with export
export interface UserType {
  name: string;
  bio: string;
  birth: string;
  number: string;
}

const initialState: UserType = {
  name: '',
  bio: '',
  birth: '',
  number: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    setBirth: (state, action: PayloadAction<string>) => {
      state.birth = action.payload;
    },
    setNumber: (state, action: PayloadAction<string>) => {
      state.number = action.payload;
    }
  }
});

export const { setName, setBio, setBirth, setNumber } = userSlice.actions;

export default userSlice.reducer;
