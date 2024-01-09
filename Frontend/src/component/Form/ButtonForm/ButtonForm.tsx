import styles from './ButtonForm.module.scss';

interface IButtonFormProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  not_active?: boolean;
  margin_block_start?: boolean;
}
const ButtonForm = ({
  children,
  type,
  not_active,

  margin_block_start,
}: IButtonFormProps) => {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.btn} ${not_active ? styles.not_active : ''}
      ${margin_block_start ? styles.margin_block_start : ''}`}
    >
      {children}
    </button>
  );
};

ButtonForm.defaultProps = {
  not_active: false,
  margin_block_start: false,
};

export default ButtonForm;
