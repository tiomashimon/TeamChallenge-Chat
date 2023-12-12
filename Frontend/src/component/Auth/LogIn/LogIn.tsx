import { FormDataSignIn } from '../../../utils/interface';
import styles from '../Auth.module.css';

interface LogInProps {
  formData: FormDataSignIn
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleResetPassword: () => void
}
const LogIn = ({formData, handleInputChange, handleResetPassword}: LogInProps) => {
  return (
    <>
      <div className={styles.form_group}>
        <label htmlFor="adress" className={`${styles.subtitle} ${styles.label}`}>E-Mail Adress</label>

        <input
          type="email"
          name="adress"
          id="adress"
          placeholder='mail@gmail.com'
          className={styles.input}
        />
      </div>
      <div className={styles.form_group}>
        <label htmlFor="password" className={`${styles.subtitle} ${styles.label}`}>Password</label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder='password'
          value={formData.password}
          onChange={handleInputChange}
          className={`${styles.input} ${styles.input_password}`}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="remember" className={styles.check}>
          <input type="checkbox" id="remember" name='remember' className={styles.check_input} />
          <span className={styles.check_box}></span>
          Remember me
        </label>

        <button type='button' className={styles.reset} onClick={handleResetPassword}>RESET PASSWORD</button>
      </div>
    </>
  );
};

export default LogIn;
