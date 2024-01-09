import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface TokenState {
  tokenRefresh: string | undefined;
  tokenAccess: string | undefined;
}

const initialState: TokenState = {
  tokenRefresh: Cookies.get('refreshToken'),
  tokenAccess: Cookies.get('accessToken'),
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    logoutToken: () => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      return initialState;
    },
    setToken(state, action: PayloadAction<TokenState>) {
      // const currentDate = new Date();
      // const expirationTime = new Date(currentDate.getTime() + 10 * 1000);

      Cookies.set('accessToken', action.payload.tokenAccess!, { expires: 1 });
      Cookies.set('refreshToken', action.payload.tokenRefresh!, { expires: 1 });
      return {
        ...state,
        tokenRefresh: action.payload.tokenRefresh,
        tokenAccess: action.payload.tokenAccess,
      };
    },
  },
});

export default tokenSlice.reducer;

export const { setToken, logoutToken } = tokenSlice.actions;
