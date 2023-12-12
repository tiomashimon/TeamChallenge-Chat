import arrowIcon from '../../assets/arrow-left.svg';
import LogoIcon from '../../assets/logo.svg';
import SendIcon from '../../assets/send.svg';
import styles from './ChatPage.module.css';
const ChatPage = () => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.nav}>
          <button className={styles.arrow}>
            <img src={arrowIcon} alt="arrow"  />
          </button>
          <span className={styles.name}>Name chat</span>
        </div>

        <div className={styles.settings}>
          settings
        </div>
      </div>

      <div className={styles.chat}>
        <div className={styles.messages}>
          <div className={styles.other_messages}>
            <div className={styles.other_photo}>
              <img src={LogoIcon} alt="photo" />
            </div>

            <div className={styles.other_message}>
              <p className={`${styles.text} ${styles.other_text}`}>text1</p>
              <p className={`${styles.text} ${styles.other_text}`}>text1</p>
              <p className={`${styles.text} ${styles.other_text}`}>text1</p>
            </div>
          </div>

          <div className={styles.your_messages}>
            <p className={`${styles.text} ${styles.your_text}`}>text1</p>
            <p className={`${styles.text} ${styles.your_text}`}>text1</p>
            <p className={`${styles.text} ${styles.your_text}`}>text1</p>
          </div>
        </div>

        <div className={styles.input}>
          <input type="text" className={styles.input_field} placeholder='Write something' />

          <button className={styles.sendBtn}>
            <img src={SendIcon} alt="send" className={styles.send_icon} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
