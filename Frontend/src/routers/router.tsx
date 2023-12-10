import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from '../component/Layout/Layout';
import { ChatPage, ChatsPage, ErrorPage, LoginPage } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    < Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<LoginPage />} />
      <Route path='chats' element={<ChatsPage />} />
      <Route path="chats/:chatId" element={<ChatPage />} />
    </Route>
  ))