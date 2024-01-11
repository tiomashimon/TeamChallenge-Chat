import { useState } from 'react';
import arrowLeft from '../../assets/img/angle-left.png';
import { TSettingConfig } from '../../utils/type';
import Help from './Help/Help';
import Language from './Language/Language';
import MainSetting from './MainSetting/MainSetting';
import Notification from './Notification/Notification';
import styles from './SettingLayout.module.scss';
import Theme from './Theme/Theme';

interface ISettingLayoutProps {
  handleExitSetting: () => void;
}

const SettingLayout = ({ handleExitSetting }: ISettingLayoutProps) => {
  const [activeSettingConfig, setActiveSettingConfig] = useState<TSettingConfig>('settings');
  const [fadeOut, setFadeOut] = useState(false);

  const handleChangeSettingConfig = (config: TSettingConfig) => {
    setFadeOut(true);
    setTimeout(() => {
      setActiveSettingConfig(config);
      setFadeOut(false);
    }, 200);
  };

  const handleBackToSetting = () => {
    setFadeOut(true);
    setTimeout(() => {
      if (activeSettingConfig === 'settings') {
        handleExitSetting();
      }
      setActiveSettingConfig('settings');
      setFadeOut(false);
    }, 200);
  };

  const viewHeader = () => {
    switch (activeSettingConfig) {
      case 'settings':
        return 'Settings';
      case 'notification':
        return 'Notification';
      case 'language':
        return 'Language';
      case 'theme':
        return 'Theme';
      case 'help':
        return 'Help';
      default:
        return null;
    }
  };

  const viewContent = () => {
    switch (activeSettingConfig) {
      case 'settings':
        return <MainSetting handleChangeSettingConfig={handleChangeSettingConfig} />;
      case 'notification':
        return <Notification />;
      case 'language':
        return <Language />;
      case 'theme':
        return <Theme />;
      case 'help':
        return <Help />;
      default:
        return null;
    }
  };

  return (
    <div className={`${styles.container} ${fadeOut ? styles.fadeOut : ''}`}>
      <header className={styles.header}>
        <button type="button" onClick={handleBackToSetting}>
          <img src={arrowLeft} alt="arrowLeft" />
        </button>
        <h1 className={styles.title}>{viewHeader()}</h1>
      </header>

      <nav className={styles.nav}>{viewContent()}</nav>
    </div>
  );
};

export default SettingLayout;
