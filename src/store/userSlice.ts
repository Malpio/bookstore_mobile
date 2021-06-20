import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../types/api/UserType';

const initialState: UserType = {
  id: -1,
  token: '',
  email: '',
  username: '',
  roles: [],
  type: 'Bearer',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserType>) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.roles = action.payload.roles;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    removeUserData: (state) => {
      state.email = '';
      state.id = -1;
      state.roles = [];
      state.username = '';
      state.token = '';
    },
  },
});

export const { setUserData, removeUserData } = slice.actions;

export default slice.reducer;
