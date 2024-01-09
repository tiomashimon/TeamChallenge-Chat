import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LayoutChat from '../component/Layout/LayoutChat/LayoutChat';
import LayoutAuth from '../component/Layout/layoutAuth/LayoutAuth';
import GuestPage from '../pages/AuthPages/GuestPage/GuestPage';
import RegistrationPage from '../pages/AuthPages/RegistrationPage/RegistrationPage';
import ResetPassPage from '../pages/AuthPages/ResetPassPage/ResetPassPage';
import SignInPage from '../pages/AuthPages/SignInPage/SignInPage';
import ChatPage from '../pages/ChatPage/ChatPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import PathUrl from '../utils/typePath';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route element={<LayoutAuth />}>
        <Route index element={<GuestPage />} />
        <Route path={PathUrl.SIGNIN} element={<SignInPage />} />
        <Route path={PathUrl.REGISTER} element={<RegistrationPage />} />
        <Route path={PathUrl.RESET} element={<ResetPassPage />} />
      </Route>
      <Route path={PathUrl.CHATS} element={<LayoutChat />}>
        <Route path=":chatId" element={<ChatPage />} />
      </Route>
    </Route>
  )
);

export default router;
