import styles from './InputForm.module.scss';

interface IInputFormProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  errorMessage?: string;
}
const InputForm = ({ name, label, type, errorMessage, placeholder }: IInputFormProps) => {
  return (
    <div className={styles.form}>
      <label className={styles.label} htmlFor={name}>
        {label}
        {errorMessage && <span className={styles.error}>{errorMessage}</span>}
      </label>
      <input className={styles.input} type={type} id={name} placeholder={placeholder} />
    </div>
  );
};

InputForm.defaultProps = {
  errorMessage: 'Error',
};

export default InputForm;
