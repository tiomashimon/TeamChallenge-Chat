import styles from './Help.module.scss';

const Help = () => {
  const helpItems = ['Contact us', 'Licenses', 'Tearms and Privacy Policy', 'Help Center'];
  return (
    <ul>
      {helpItems.map((item) => (
        <li key={item}>
          <button type="button" className={styles.btn}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Help;
