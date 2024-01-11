import { useState } from 'react';
import withAuthCheck from '../../../utils/HOC';
import { TNavItem } from '../../../utils/type';
import SectionChat from '../../Sections/SectionChat/SectionChat';
import SectionGlobal from '../../Sections/SectionGlobal/SectionGlobal';
import SettingLayout from '../../Settings/SettingLayout';
import Sidebar from '../../Sidebar/Sidebar';
import styles from './LayoutChat.module.scss';

const LayoutChat = () => {
  const [activeNavItem, setActiveNavItem] = useState<TNavItem>('message');
  const [activeSelect, setActiveSelect] = useState<Exclude<TNavItem, 'settings'>>('message');
  const [activeSetting, setActiveSetting] = useState(false);
  const handleNavItemClick = (navItem: TNavItem) => {
    setActiveNavItem(navItem);
    setActiveSetting(navItem === 'settings');

    if (navItem !== 'settings') {
      const select = navItem === 'global' ? 'global' : 'message';
      setActiveSelect(select);
    }
  };

  const handleExitSetting = () => {
    setActiveNavItem(activeSelect);
    setActiveSetting(false);
  };

  return (
    <main className={styles.container}>
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
      <section className={styles.content}>
        {activeSelect === 'global' && <SectionGlobal />}
        {activeSelect === 'message' && <SectionChat />}
        {activeSetting && <SettingLayout handleExitSetting={handleExitSetting} />}
      </section>
    </main>
  );
};

export default withAuthCheck(LayoutChat);
