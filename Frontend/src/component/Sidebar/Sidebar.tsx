import arrowLeft from '../../assets/img/arrow-left.svg';
import Contact from '../Contact/Contact';
import SearchByContact from '../SearchByContact/SearchByContact';
import styles from './SideBar.module.css';

const SideBar = () => {
  return (
    <>
      <nav className={styles.chats_nav}>
        <img src={arrowLeft} alt="arrow" />
        <h1 className={styles.nav_title}>Rooms</h1>
      </nav>

      <div className={styles.box_by_contact}>
        <SearchByContact />

        <div className="contact_list">
          <Contact />
          <Contact />
        </div>
      </div>
    </>
  );
};

export default SideBar;
