import styles from './AuthForm.module.scss';

interface IAuthFormProps {
  children: React.ReactNode;
  margin_block_start?: boolean;
}
const AuthForm = ({ children, margin_block_start }: IAuthFormProps) => {
  return (
    <form className={`${styles.form} ${margin_block_start ? styles.margin_block_start : ''}`}>
      {children}
    </form>
  );
};

AuthForm.defaultProps = {
  margin_block_start: false,
};

export default AuthForm;
