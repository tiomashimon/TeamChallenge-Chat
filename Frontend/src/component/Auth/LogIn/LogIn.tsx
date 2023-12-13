import { IFormData } from '../../../utils/interface';
import styles from '../Auth.module.css';

interface LogInProps {
  formData: IFormData
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  // handleResetPassword: () => void
  error: IFormData | null
}
const LogIn = ({ formData, handleInputChange, error }: LogInProps) => {
  return (
    <>
      <div className={styles.form_group}>
        <label htmlFor="nickname" className={`${styles.subtitle} ${styles.label}`}>
          Nickname
          {error && error.nickname && <p className={styles.error}>{error.nickname}</p>}
        </label>

        <input
          type="text"
          name="nickname"
          id="nickname"
          placeholder='Your Nickname'
          value={formData.nickname}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="username" className={`${styles.subtitle} ${styles.label}`}>
          Username
          {error && error.username && <p className={styles.error}>{error.username}</p>}
        </label>

        <input
          type="text"
          name="username"
          id="username"
          placeholder='Your Username'
          value={formData.username}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="password" className={`${styles.subtitle} ${styles.label}`}>
          Password
          {error && error.password && <p className={styles.error}>{error.password}</p>}
        </label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder='Your password'
          value={formData.password}
          onChange={handleInputChange}
          className={`${styles.input} ${styles.input_password}`}
        />
      </div>

      <div className={styles.form_group}>
        <label htmlFor="password2" className={`${styles.subtitle} ${styles.label}`}>
          Rapid Password
          {error && error.password2 && <p className={styles.error}>{error.password2}</p>}
        </label>

        <input
          type="password2"
          name="password2"
          id="password2"
          placeholder='Rapid password'
          value={formData.password2}
          onChange={handleInputChange}
          className={`${styles.input} ${styles.input_password}`}
        />
      </div>

      {/* <div className={styles.row}>
        <label htmlFor="remember" className={styles.check}>
          <input type="checkbox" id="remember" name='remember' className={styles.check_input} />
          <span className={styles.check_box}></span>
          Remember me
        </label>

        <button type='button' className={styles.reset} onClick={handleResetPassword}>RESET PASSWORD</button>
      </div> */}
    </>
  );
};

export default LogIn;
