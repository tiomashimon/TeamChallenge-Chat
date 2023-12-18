import { HTMLProps, forwardRef } from 'react';
import styles from './InputForm.module.scss';

interface IInputFormProps extends HTMLProps<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const InputForm = forwardRef<HTMLInputElement, IInputFormProps>(
  ({ label, errorMessage, id, ...restProps }, ref) => {
    return (
      <div className={styles.form}>
        <label className={styles.label} htmlFor={id}>
          {label}
          {errorMessage && <span className={styles.error}>{errorMessage}</span>}
        </label>
        <input className={styles.input} ref={ref} id={id} {...restProps} />
      </div>
    );
  }
);

InputForm.defaultProps = {
  errorMessage: '',
};

export default InputForm;
