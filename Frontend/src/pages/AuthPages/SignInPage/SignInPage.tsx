import { NavLink } from 'react-router-dom';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  return (
    <>
      <TitleForm titleName="Welcome" subtitleName="Please choose how you want to proceed" />
      <div className={styles.buttons}>
        <ButtonForm type="submit" margin_inline_end>
          <NavLink to="/signIn">Sign in</NavLink>
        </ButtonForm>
        <ButtonForm type="submit" not_active>
          <NavLink to="/">Guest</NavLink>
        </ButtonForm>
      </div>

      <AuthForm margin_block_start>
        <InputForm
          name="username"
          type="text"
          placeholder="Enter your email or username"
          label="E-Mail / Username"
          errorMessage="Username is required"
        />

        <InputForm
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          errorMessage="Password is required"
        />

        <div className={styles.row}>
          <label htmlFor="remember" className={styles.check}>
            <input type="checkbox" id="remember" name="remember" className={styles.check_input} />
            <span className={styles.check_box} />
            Remember me
          </label>

          <NavLink to="/reset" className={styles.reset}>
            RESET PASSWORD
          </NavLink>
        </div>

        <ButtonForm type="submit" margin_block_start>
          Log In
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default SignInPage;
