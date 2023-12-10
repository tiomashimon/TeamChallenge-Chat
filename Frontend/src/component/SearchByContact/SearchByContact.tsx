import searchIcon from '../../assets/search.png';
import styles from './SearchByContact.module.css';
const SearchByContact = () => {
  return (
    <div className={styles.search_by_contact}>
      <input type="search" className={styles.search} />
      <img src={searchIcon} alt="Search" className={styles.search_icon} />
    </div>
  );
};

export default SearchByContact;
