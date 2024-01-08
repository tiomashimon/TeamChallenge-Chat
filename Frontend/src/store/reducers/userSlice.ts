import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/type';

interface UserState {
  user: TUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<TUser>) => {
      return { ...state, user: action.payload };
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
