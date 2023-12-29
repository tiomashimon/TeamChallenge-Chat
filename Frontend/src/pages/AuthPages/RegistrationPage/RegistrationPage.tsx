import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { useRegisterUserMutation } from '../../../store/api/authApi';

const registerSchema = object({
  nickname: string().min(1, 'Nickname is required').max(20, 'Nickname is too long'),
  username: string().min(1, 'Username is required').max(20, 'Username is too long'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export type TRegisterInput = TypeOf<typeof registerSchema>;

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
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />
        <InputForm
          id="username"
          type="text"
          label="Username"
          placeholder="Enter your username"
          errorMessage={errors.username?.message}
          {...register('username')}
        />
        <InputForm
          id="email"
          type="email"
          label="E-Mail Adress"
          placeholder="Enter your email"
          errorMessage={errors.email?.message}
          {...register('email')}
        />
        <InputForm
          id="password"
          label="Password"
          placeholder="Enter your password"
          errorMessage={errors.password?.message}
          {...register('password')}
          showPassword
        />

        <ButtonForm type="submit" margin_block_start>
          Submit
        </ButtonForm>
      </AuthForm>
      {registerError. && <p>{registerError.status}</p>}
    </>
  );
};

export default RegistrationPage;
