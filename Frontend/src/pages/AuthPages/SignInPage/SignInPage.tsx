import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { useLoginUserMutation } from '../../../store/api/authApi';
import { setRememberMe } from '../../../store/reducers/rememberMe';
import { useAppDispatch } from '../../../store/store';
import { ErrorType } from '../../../utils/interface';
import styles from './SignInPage.module.scss';

const registerSchema = object({
  username: string().min(1, 'Username is required'),
  password: string()
    .min(2, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export type TSignInInput = TypeOf<typeof registerSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInInput>({
    resolver: zodResolver(registerSchema),
  });

  const [loginUser, { isLoading, isSuccess, error: loginError }] = useLoginUserMutation();

  const [rememberMeState, setRememberMeState] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      navigate('/chats');
    }
  }, [isLoading, navigate, isSuccess]);

  const onSubmit = handleSubmit((data) => {
    loginUser(data);
    if (rememberMeState) {
      dispatch(setRememberMe(rememberMeState));
    }
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMeState(event.target.checked);
  };

  const errorHandler = (error: ErrorType) => {
    if (error) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

        return <div>{errMsg}</div>;
      }

      return <div>{error.message}</div>;
    }
    return <div>{error}</div>;
  };
  return (
    <>
      <TitleForm titleName="Welcome" subtitleName="Please choose how you want to proceed" />
      <div className={styles.buttons}>
        <NavLink to="/signIn">
          <ButtonForm type="submit">Sign in</ButtonForm>
        </NavLink>
        <NavLink to="/">
          <ButtonForm type="submit" not_active>
            Guest
          </ButtonForm>
        </NavLink>
      </div>

      <AuthForm margin_block_start onSubmit={onSubmit}>
        <InputForm
          id="username"
          type="text"
          placeholder="Enter your username"
          label="Username"
          errorMessage={errors.username?.message}
          {...register('username')}
        />

        <InputForm
          id="password"
          placeholder="Enter your password"
          label="Password"
          errorMessage={errors.password?.message}
          {...register('password')}
          showPassword
        />

        <div className={styles.row}>
          <label htmlFor="remember" className={styles.check}>
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className={styles.check_input}
              onChange={handleCheckboxChange}
              checked={rememberMeState}
            />
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
      {loginError && errorHandler(loginError)}
    </>
  );
};

export default SignInPage;
