import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { authApi } from './api/authApi';
import tokenReducer from './reducers/tokenSlice';
import userReducer from './reducers/userSlice';
import rememberMeReducer from './reducers/rememberMe';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    userState: userReducer,
    tokenState: tokenReducer,
    rememberMeState: rememberMeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
