import { useState } from 'react';
import styles from './Language.module.scss';

const Language = () => {
  const languages = [
    'English',
    'Українська',
    'Deutsch',
    'Italiano',
    'Polski',
    'Português',
    'Español',
  ];
  const [currentLanguage, setCurrentLanguage] = useState('English');

  return (
    <ul>
      {languages.map((language) => (
        <li key={language}>
          <button type="button" onClick={() => setCurrentLanguage(language)}>
            <span className={`${styles.lang} ${currentLanguage === language ? styles.active : ''}`}>
              {language}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Language;
