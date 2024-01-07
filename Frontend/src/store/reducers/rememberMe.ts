import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IRememberMe {
  rememberMe: boolean;
}

const initialState: IRememberMe = {
  rememberMe: localStorage.getItem('rememberMe') === 'true',
};

export const rememberMeSlice = createSlice({
  name: 'rememberMe',
  initialState,
  reducers: {
    logoutRememberMe: () => {
      localStorage.removeItem('rememberMe');
      return initialState;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      return { ...state, rememberMe: action.payload };
    },
  },
});

export default rememberMeSlice.reducer;

export const { setRememberMe, logoutRememberMe } = rememberMeSlice.actions;
