import { TNavItem } from '../../utils/type';
import GlobalSVG from '../SVG/GlobalSVG';
import LogoSVG from '../SVG/LogoSVG';
import MessageSVG from '../SVG/MessageSVG';
import ProfileSVG from '../SVG/ProfileSVG';
import SettingsSVG from '../SVG/SettingsSVG';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  activeNavItem: string;
  handleNavItemClick: (navItem: TNavItem) => void;
}

const Sidebar = ({ activeNavItem, handleNavItemClick }: SidebarProps) => {
  return (
    <aside className={styles.aside}>
      <div>
        <LogoSVG />
        <hr />
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li>
              <MessageSVG
                active={activeNavItem === 'message'}
                onClick={() => handleNavItemClick('message')}
              />
            </li>

            <li>
              <GlobalSVG
                active={activeNavItem === 'global'}
                onClick={() => handleNavItemClick('global')}
              />
            </li>

            <li>
              <SettingsSVG
                active={activeNavItem === 'settings'}
                onClick={() => handleNavItemClick('settings')}
              />
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <ProfileSVG />
      </div>
    </aside>
  );
};

export default Sidebar;
