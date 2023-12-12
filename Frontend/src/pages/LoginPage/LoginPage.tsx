import { useState } from 'react';
import LogIn from '../../component/Auth/LogIn/LogIn';
import SignUp from '../../component/Auth/SignUp/SignUp';
import { FormDataGuest, FormDataSignIn } from '../../utils/interface';
import styles from './loginPage.module.css';

const Login = () => {
  const [formDataGuest, setFormDataGuest] = useState<FormDataGuest>({
    nickname: '',
  });

  const [isAuth, setAuth] = useState<Boolean>(false);
  const [formDataSignIn, setFormDataSignIn] = useState<FormDataSignIn>({
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataGuest({
      ...formDataGuest,
      [name]: value,
    });
  };
  const handleInputChangeSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataSignIn({
      ...formDataSignIn,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_BACKEND_URL}user/guest/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataGuest),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error sending data:', error);
      });
  };
  const handleButtonClick = (isSignIn: boolean) => () => {
    setAuth(isSignIn);
  };

  const handleResetPassword = () => {
    setFormDataSignIn(prevState => {
      return {
        ...prevState,
        password: '',
      };
    })
  }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome</h1>

        <h2 className={styles.subtitle}>Please choose how you want to proceed</h2>

        <div className={styles.select_auth}>
          <button className={`btn ${styles.btn_guest} ${isAuth ? '' : styles.active}`} onClick={handleButtonClick(false)}>Guest</button>
          <button className={`btn ${styles.btn_signIn} ${isAuth ? styles.active : ''}`} onClick={handleButtonClick(true)}>Sign in</button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isAuth && (
            <h2 className={styles.subtitle}>You can create an account later</h2>
          )}

          {isAuth ? (
            <LogIn
              formData={formDataSignIn}
              handleInputChange={handleInputChangeSignIn}
              handleResetPassword={handleResetPassword}
            />
          ) : (
            <SignUp formData={formDataGuest} handleInputChange={handleInputChange} />
          )}

          <button type="submit" className={`btn ${styles.btn_signUp}`}>{isAuth ? 'Log In' : 'Sign Up'}</button>
        </form>
      </div>
      {isAuth && <div className={styles.footer}>
        <button type='button' className={styles.btn_footer} onClick={handleButtonClick(false)}>Don't have an account?</button>
      </div>}
    </div>
  );
};

export default Login;
