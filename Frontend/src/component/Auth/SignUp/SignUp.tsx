import { FormDataGuest } from '../../../utils/interface';
import styles from '../Auth.module.css';

interface SignUpProps {
  formData: FormDataGuest;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SignUp = ({formData, handleInputChange}: SignUpProps) => {
  return (
    <div className={styles.form_group}>
      <label htmlFor="nickname" className={`${styles.subtitle} ${styles.label}`}>Username</label>

      <input
        type="text"
        name="nickname"
        id="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
        placeholder='Username'
        className={styles.input}
      />
    </div>
  );
};

export default SignUp;
