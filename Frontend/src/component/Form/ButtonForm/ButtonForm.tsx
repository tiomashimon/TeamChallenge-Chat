import styles from './ButtonForm.module.scss';

interface IButtonFormProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  not_active?: boolean;
  margin_inline_end?: boolean;
  margin_block_start?: boolean;
}
const ButtonForm = ({
  children,
  type,
  not_active,
  margin_inline_end,
  margin_block_start,
}: IButtonFormProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${styles.btn} ${not_active ? styles.not_active : ''}
      ${margin_inline_end ? styles.margin_inline_end : ''}
      ${margin_block_start ? styles.margin_block_start : ''}`}
    >
      {children}
    </button>
  );
};

ButtonForm.defaultProps = {
  not_active: false,
  margin_inline_end: false,
  margin_block_start: false,
};

export default ButtonForm;
