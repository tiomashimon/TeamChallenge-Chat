import plus from '../../assets/plus.svg';
import SearchByContact from '../../component/SearchByContact/SearchByContact';
import styles from './ChatsPage.module.css';

const ChatsPage = () => {
  return (
    <>
      <SearchByContact />

      <div className="chat_list">
        <div className="chat_group" />
      </div>

      <div className={styles.add_chat}>
        <img src={plus} alt="plus" />
      </div>
    </>
  );
};

export default ChatsPage;
