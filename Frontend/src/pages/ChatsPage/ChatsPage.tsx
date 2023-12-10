import Contact from '../../component/Contact/Contact';
import SearchByContact from '../../component/SearchByContact/SearchByContact';
import styles from './ChatsPage.module.css';
import arrowLeft from '../../assets/arrow-left.svg';
import plus from '../../assets/plus.svg';

const ChatsPage = () => {
  return (
    <main className={styles.chats}>
      <aside className={`${styles.column} ${styles.column_1}`}>
        <nav className={styles.chats_nav}>
          <img src={arrowLeft} alt="arrow" />
          <h1 className={styles.nav_title}>Rooms</h1>
        </nav>

        <div className={styles.box_by_contact}>
          <SearchByContact />

          <div className='contact_list'>
            <Contact />
            <Contact />
          </div>
        </div>
      </aside>
      <section className={`${styles.column} ${styles.column_2}`}>
        <SearchByContact/>

        <div className="chat_list">
          <div className="chat_group"></div>
        </div>
      </section>

      <div className={styles.add_chat}>
        <img src={plus} alt="plus" />
      </div>
    </main>
  );
};

export default ChatsPage;
