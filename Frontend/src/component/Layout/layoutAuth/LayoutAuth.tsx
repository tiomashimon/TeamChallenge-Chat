import { NavLink, Outlet, useLocation } from 'react-router-dom';
import angleLeft from '../../../assets/img/angle-left.png';
import styles from './LayoutAuth.module.scss';

const LayoutAuth = () => {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {pathname === '/register' || pathname === '/reset' ? (
          <div className={styles.arrow}>
            <NavLink to="/">
              <img src={angleLeft} alt="logo" />
            </NavLink>
          </div>
        ) : null}
        <div className={styles.content}>
          <Outlet />
        </div>

        {pathname === '/signIn' ? (
          <div className={styles.footer}>
            <NavLink to="/register">Don&apos;t have an account?</NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LayoutAuth;
