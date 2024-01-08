import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { useRegisterUserMutation } from '../../../store/api/authApi';
import errorHandler from '../../../utils/errorHandler';
import { TRegisterInput } from '../../../utils/type';
import { registerSchema } from '../../../utils/zodSchema';

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [registerUser, { isLoading, isSuccess, error: registerError }] = useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/chats');
    }
  }, [isLoading, navigate, isSuccess]);

  const onSubmit = handleSubmit((data) => {
    const dataForm = {
      nickname: data.username,
      username: data.username,
      email: data.email,
      password: data.password,
      password2: data.password,
    };
    registerUser(dataForm);
  });

  return (
    <>
      <TitleForm titleName="Registration" subtitleName="Please fill in the data" />

      <AuthForm margin_block_start onSubmit={onSubmit}>
        <InputForm
          id="nickname"
          type="text"
          label="Nickname"
          placeholder="Enter your nickname"
          errorMessage={
            registerError ? errorHandler(registerError, 'nickname') : errors.nickname?.message
          }
          {...register('nickname')}
        />
        <InputForm
          id="username"
          type="text"
          label="Username"
          placeholder="Enter your username"
          errorMessage={
            registerError ? errorHandler(registerError, 'username') : errors.username?.message
          }
          {...register('username')}
        />
        <InputForm
          id="email"
          type="email"
          label="E-Mail Adress"
          placeholder="Enter your email"
          errorMessage={
            registerError ? errorHandler(registerError, 'email') : errors.email?.message
          }
          {...register('email')}
        />
        <InputForm
          id="password"
          label="Password"
          placeholder="Enter your password"
          errorMessage={
            registerError ? errorHandler(registerError, 'password') : errors.password?.message
          }
          {...register('password')}
          showPassword
        />

        <ButtonForm type="submit" margin_block_start>
          Submit
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default RegistrationPage;
