import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LayoutChat from '../component/Layout/LayoutChat/LayoutChat';
import LayoutRoot from '../component/Layout/LayoutRoot';
import LayoutAuth from '../component/Layout/layoutAuth/LayoutAuth';
import GuestPage from '../pages/AuthPages/GuestPage/GuestPage';
import RegistrationPage from '../pages/AuthPages/RegistrationPage/RegistrationPage';
import ResetPassPage from '../pages/AuthPages/ResetPassPage/ResetPassPage';
import SignInPage from '../pages/AuthPages/SignInPage/SignInPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ChatsPage from '../pages/ChatsPage/ChatsPage';
import ChatPage from '../pages/ChatPage/ChatPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutRoot />} errorElement={<ErrorPage />}>
      <Route element={<LayoutAuth />}>
        <Route index element={<GuestPage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="reset" element={<ResetPassPage />} />
      </Route>
      <Route path="chats" element={<LayoutChat />}>
        <Route index element={<ChatsPage />} />
        <Route path=":chatId" element={<ChatPage />} />
      </Route>
    </Route>
  )
);

export default router;
