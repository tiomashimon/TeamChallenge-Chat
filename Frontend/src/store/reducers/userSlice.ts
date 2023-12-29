import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../utils/interface';

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<IUser>) => {
      return { ...state, user: action.payload };
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
