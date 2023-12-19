import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { ISignInForm } from '../../../utils/interface';
import styles from './SignInPage.module.scss';

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
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

      <AuthForm margin_block_start onSubmit={onSubmit}>
        <InputForm
          id="username"
          type="text"
          placeholder="Enter your email or username"
          label="E-Mail / Username"
          errorMessage={errors.username?.message}
          {...register('username', { required: 'Username is required' })}
        />

        <InputForm
          id="password"
          placeholder="Enter your password"
          label="Password"
          errorMessage={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
          showPassword
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