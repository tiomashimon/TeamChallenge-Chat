import { Outlet } from 'react-router-dom';
import SideBar from '../../Sidebar/Sidebar';
import styles from './LayoutChat.module.css';

const LayoutChat = () => {
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
