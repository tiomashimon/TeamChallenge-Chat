import { useForm } from 'react-hook-form';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { IRegistrationForm } from '../../../utils/interface';

const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    defaultValues: {
      nickname: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
          {...register('nickname', { required: 'Nickname is required' })}
        />
        <InputForm
          id="username"
          type="text"
          label="Username"
          placeholder="Enter your username"
          errorMessage={errors.username?.message}
          {...register('username', { required: 'Username is required' })}
        />
        <InputForm
          id="email"
          type="email"
          label="E-Mail Adress"
          placeholder="Enter your email"
          errorMessage={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <InputForm
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          errorMessage={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />

        <ButtonForm type="submit" margin_block_start>
          Submit
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default RegistrationPage;
