import { FormEvent } from 'react';
import styles from './AuthForm.module.scss';

interface IAuthFormProps {
  children: React.ReactNode;
  margin_block_start?: boolean;
  onSubmit: (e?: FormEvent<HTMLFormElement>) => Promise<void>;
}
const AuthForm = ({ children, margin_block_start, onSubmit }: IAuthFormProps) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e);
  };
  return (
    <form
      className={`${styles.form} ${margin_block_start ? styles.margin_block_start : ''}`}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
};

AuthForm.defaultProps = {
  margin_block_start: false,
};

export default AuthForm;
