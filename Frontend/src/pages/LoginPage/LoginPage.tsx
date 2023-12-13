import { useState } from 'react';
import LogIn from '../../component/Auth/LogIn/LogIn';
import SignUp from '../../component/Auth/SignUp/SignUp';
import { IFormData } from '../../utils/interface';
import styles from './loginPage.module.css';

const Login = () => {
  const [formDataGuest, setFormDataGuest] = useState<IFormData>({
    nickname: '',
  });

  const [formDataSignIn, setFormDataSignIn] = useState<IFormData>({
    nickname: '',
    username: '',
    password: '',
    password2: '',
  })
  const [isAuth, setAuth] = useState<Boolean>(false);

  const [error, setError] = useState<IFormData | null>(null);
  const [errorGuest, setErrorGuest] = useState<IFormData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (isAuth) {
      setFormDataSignIn({
        ...formDataSignIn,
        [name]: value,
      });
    }

    setFormDataGuest({
      ...formDataGuest,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const URI = isAuth ? `${import.meta.env.VITE_BACKEND_URL}user/` : `${import.meta.env.VITE_BACKEND_URL}user/guest/`;
    const formData = isAuth ? formDataSignIn : formDataGuest;
    try {
      const response = await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        isAuth ? setError(errorData) : setErrorGuest(errorData);
      } else {
        const data = await response.json();
        setError(null);
        setErrorGuest(null)
        console.log(data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  const handleButtonClick = (isSignIn: boolean) => () => {
    setAuth(isSignIn);
  };

  // const handleResetPassword = () => {
  //   setFormDataSignIn(prevState => {
  //     return {
  //       ...prevState,
  //       password: '',
  //     };
  //   })
  // }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome</h1>

        <h2 className={styles.subtitle}>Please choose how you want to proceed</h2>

        <div className={styles.select_auth}>
          <button className={`btn ${styles.btn_guest} ${isAuth ? '' : styles.active}`} onClick={handleButtonClick(false)}>
            Guest
          </button>
          <button className={`btn ${styles.btn_signIn} ${isAuth ? styles.active : ''}`} onClick={handleButtonClick(true)}>
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {!isAuth && (
            <h2 className={styles.subtitle}>You can create an account later</h2>
          )}

          {isAuth ? (
            <LogIn
              formData={formDataSignIn}
              handleInputChange={handleInputChange}
              error={error}
            // handleResetPassword={handleResetPassword}
            />
          ) : (
            <SignUp
              formData={formDataGuest}
              handleInputChange={handleInputChange}
              error={errorGuest} />
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
