import styles from './CheckBox.module.scss';

interface ICheckBoxProps {
  children: React.ReactNode;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  state: boolean;
  id: string;
}
const CheckBox = ({ children, handleCheckboxChange, state, id }: ICheckBoxProps) => {
  return (
    <label htmlFor={id} className={styles.check}>
      {children}
      <input
        type="checkbox"
        id={id}
        className={styles.check_input}
        onChange={handleCheckboxChange}
        checked={state}
      />
      <span className={styles.check_box} />
    </label>
  );
};

export default CheckBox;
