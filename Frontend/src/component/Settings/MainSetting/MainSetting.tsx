import info from '../../../assets/img/info.png';
import lang from '../../../assets/img/lang.svg';
import megaphone from '../../../assets/img/megaphone.png';
import theme from '../../../assets/img/theme.png';
import { TSettingConfig } from '../../../utils/type';
import styles from './MainSetting.module.scss';

interface IMainSettingProps {
  handleChangeSettingConfig: (config: TSettingConfig) => void;
}

const MainSetting = ({ handleChangeSettingConfig }: IMainSettingProps) => {
  return (
    <ul className={styles.list}>
      <li>
        <button type="button" onClick={() => handleChangeSettingConfig('notification')}>
          <img src={megaphone} alt="megaphone" />
          <span>Notification</span>
        </button>
      </li>
      <li className={styles.langItem}>
        <button
          type="button"
          onClick={() => handleChangeSettingConfig('language')}
          className={styles.langItem}
        >
          <div className={styles.langContainer}>
            <img src={lang} alt="lang" />
            <span>Language</span>
          </div>
          <span className={styles.lang}>English</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleChangeSettingConfig('theme')}>
          <img src={theme} alt="theme" />
          <span>Theme</span>
        </button>
      </li>
      <li>
        <button type="button" onClick={() => handleChangeSettingConfig('help')}>
          <img src={info} alt="info" />
          <span>Help</span>
        </button>
      </li>
    </ul>
  );
};

export default MainSetting;
