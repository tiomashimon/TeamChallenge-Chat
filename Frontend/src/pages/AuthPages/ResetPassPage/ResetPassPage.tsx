import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { TResetPassForm } from '../../../utils/type';
import { resetPasswordSchema } from '../../../utils/zodSchema';

const ResetPassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassForm>({
    resolver: zodResolver(resetPasswordSchema),
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
          {...register('email')}
        />
        <InputForm
          id="code"
          type="text"
          label="Code"
          placeholder="Enter code"
          errorMessage={errors.code?.message}
          {...register('code')}
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
    </>
  );
};

export default ResetPassPage;
