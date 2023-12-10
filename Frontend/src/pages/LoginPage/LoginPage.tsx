import { useState } from 'react';
import styles from './loginPage.module.css';

interface FormDataGuest {
  nickname: string;
  settings: {
    is_dark_mode: boolean;
    is_show_notifications: boolean;
    language: string;
  };
}

interface FormDataSignIn {
  email: string;
  password: string;
}
const Login = () => {
  const [formDataGuest, setFormDataGuest] = useState<FormDataGuest>({
    nickname: '',
    settings: {
      is_dark_mode: true,
      is_show_notifications: true,
      language: "string"
    }
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

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, {
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
            <>
              <div className={styles.form_group}>
                <label htmlFor="adress" className={`${styles.subtitle} ${styles.label}`}>E-Mail Adress</label>

                <input
                  type="email"
                  name="adress"
                  id="adress"
                  placeholder='mail@gmail.com'
                  className={styles.input}
                />
              </div>
              <div className={styles.form_group}>
                <label htmlFor="password" className={`${styles.subtitle} ${styles.label}`}>Password</label>

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder='password'
                  value={formDataSignIn.password}
                  onChange={handleInputChangeSignIn}
                  className={`${styles.input} ${styles.input_password}`}
                />
              </div>
              <div className={styles.row}>
                <label htmlFor="remember" className={styles.check}>
                  <input type="checkbox" id="remember" name='remember' className={styles.check_input} />
                  <span className={styles.check_box}></span>
                  Remember me
                </label>

                <button type='button' className={styles.reset} onClick={handleResetPassword}>RESET PASSWORD</button>
              </div>
            </>
          ) : (
            <div className={styles.form_group}>
              <label htmlFor="nickname" className={`${styles.subtitle} ${styles.label}`}>Username</label>

              <input
                type="text"
                name="nickname"
                id="nickname"
                value={formDataGuest.nickname}
                onChange={handleInputChange}
                placeholder='Username'
                className={styles.input}
              />
            </div>
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
