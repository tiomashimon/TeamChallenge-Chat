import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SideBar from '../../Sidebar/Sidebar';
import styles from './LayoutChat.module.css';

const LayoutChat = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        navigate('/signIn');
      }
    };

    checkAccessToken();

    const timer = setTimeout(() => {
      checkAccessToken();
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className={styles.chats}>
      <aside className={`${styles.column_1}`}>
        <SideBar />
      </aside>
      <section className={`${styles.column_2}`}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default LayoutChat;
