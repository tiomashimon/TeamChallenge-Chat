import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from '../component/Layout/Layout';
import LayoutChat from '../component/Layout/LayoutChat/LayoutChat';
import { ChatPage, ChatsPage, ErrorPage, LoginPage } from '../pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<LoginPage />} />
      <Route path="chats" element={<LayoutChat />}>
        <Route index element={<ChatsPage />} />
        <Route path=":chatId" element={<ChatPage />} />
      </Route>
    </Route>
  )
);

export default router;
