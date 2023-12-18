import { HTMLProps, forwardRef, useState } from 'react';
import EyeHideLogo from '../../../assets/img/eye-hide.svg';
import EyeLogo from '../../../assets/img/eye.svg';
import styles from './InputForm.module.scss';

interface IInputFormProps extends HTMLProps<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  showPassword?: boolean;
}

const InputForm = forwardRef<HTMLInputElement, IInputFormProps>(
  ({ label, errorMessage, id, showPassword, ...restProps }, ref) => {
    const [showPasswordState, setShowPasswordState] = useState(false);
    return (
      <div className={styles.form}>
        <label className={styles.label} htmlFor={id}>
          {label}
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </label>
        <div className={styles.row}>
          <input
            className={styles.input}
            ref={ref}
            id={id}
            {...restProps}
            type={showPassword && !showPasswordState ? 'password' : 'text'}
          />
          <button
            type="button"
            onClick={() => setShowPasswordState(!showPasswordState)}
            className={styles.eye}
          >
            {showPassword &&
              (showPasswordState ? (
                <img src={EyeLogo} alt="eye_logo" />
              ) : (
                <img src={EyeHideLogo} alt="eye_hide_logo" />
              ))}
          </button>
        </div>
      </div>
    );
  }
);

InputForm.defaultProps = {
  errorMessage: '',
  showPassword: false,
};

export default InputForm;
