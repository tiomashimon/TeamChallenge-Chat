import { useForm } from 'react-hook-form';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { IResetPassForm } from '../../../utils/interface';

const ResetPassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IResetPassForm>({
    defaultValues: {
      email: '',
      code: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <TitleForm titleName="Reset" subtitleName="Verification code sent to" />
      <AuthForm margin_block_start onSubmit={onSubmit}>
        <InputForm
          id="email"
          type="email"
          label="E-Mail"
          placeholder="Enter your email"
          errorMessage={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <InputForm
          id="code"
          type="text"
          label="Code"
          placeholder="Enter code"
          errorMessage={errors.code?.message}
          {...register('code', { required: 'Code is required' })}
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

export default ResetPassPage;
