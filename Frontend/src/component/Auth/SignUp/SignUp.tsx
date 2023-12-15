import { IFormData } from '../../../utils/interface';
import styles from '../Auth.module.css';

interface SignUpProps {
  formData: IFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: IFormData | null;
}
const SignUp = ({ formData, handleInputChange, error }: SignUpProps) => {
  return (
    <div className={styles.form_group}>
      <label htmlFor="nickname" className={`${styles.subtitle} ${styles.label}`}>
        Username
        {error && error.nickname && <p className={styles.error}>{error.nickname}</p>}
      </label>

      <input
        type="text"
        name="nickname"
        id="nickname"
        value={formData.nickname}
        onChange={handleInputChange}
        placeholder="Username"
        className={styles.input}
      />
    </div>
  );
};

export default SignUp;
