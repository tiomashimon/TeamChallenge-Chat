/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import withAuthCheck from '../../../utils/HOC';
import Sidebar from '../../Sidebar/Sidebar';
import styles from './LayoutChat.module.scss';
import SectionChat from '../../Sections/SectionChat/SectionChat';
import SectionGlobal from '../../Sections/SectionGlobal/SectionGlobal';
import { TNavItem } from '../../../utils/type';

const LayoutChat = () => {
  const [activeNavItem, setActiveNavItem] = useState('message');
  const handleNavItemClick = (navItem: TNavItem) => {
    setActiveNavItem(navItem);
  };
  return (
    <main className={styles.container}>
      <Sidebar activeNavItem={activeNavItem} handleNavItemClick={handleNavItemClick} />
      <section>
        <div>
          {activeNavItem === 'message' ? (
            <SectionGlobal />
          ) : activeNavItem === 'global' ? (
            <SectionChat />
          ) : (
            'Settings Section'
          )}
        </div>
        <Outlet />
      </section>
    </main>
  );
};

export default withAuthCheck(LayoutChat);
