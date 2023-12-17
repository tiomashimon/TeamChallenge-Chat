import { NavLink } from 'react-router-dom';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import styles from './GuestPage.module.scss';

const GuestPage = () => {
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const URI = isAuth
  //     ? `${import.meta.env.VITE_BACKEND_URL}user/`
  //     : `${import.meta.env.VITE_BACKEND_URL}user/guest/`;
  //   const formData = isAuth ? formDataSignIn : formDataGuest;
  //   try {
  //     const response = await fetch(URI, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //       isAuth ? setError(errorData) : setErrorGuest(errorData);
  //     } else {
  //       const data = await response.json();
  //       setError(null);
  //       setErrorGuest(null);
  //       console.log(data);
  //     }
  //   } catch (errorMessage) {
  //     console.error('Error sending data:', errorMessage);
  //   }
  // };
  return (
    <>
      <TitleForm titleName="Welcome" subtitleName="Please choose how you want to proceed" />
      <div className={styles.buttons}>
        <ButtonForm type="button" not_active margin_inline_end>
          <NavLink to="/signIn">Sign in</NavLink>
        </ButtonForm>
        <ButtonForm type="button">
          <NavLink to="/">Guest</NavLink>
        </ButtonForm>
      </div>
      <p className={styles.info}>You can create an account later</p>
      <AuthForm>
        <InputForm
          name="nickname"
          type="text"
          placeholder="Enter your nickname"
          label="Nickname"
          errorMessage="Nickname is required"
        />

        <ButtonForm type="submit" margin_inline_end>
          Sign Up
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default GuestPage;
