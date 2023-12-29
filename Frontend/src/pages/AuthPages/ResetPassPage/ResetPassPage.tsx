import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';

const registerSchema = object({
  code: string().min(1, 'Code is required'),
  email: string().min(1, 'Email is required').email('Email is invalid'),
  password: string()
    .min(1, 'Password is required')
    .max(20, 'Password is too long')
    .refine((value) => value.length >= 8, { message: 'Password must be at least 8 characters' }),
});

export type TResetPassForm = TypeOf<typeof registerSchema>;

const ResetPassPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TResetPassForm>({
    resolver: zodResolver(registerSchema),
  });

  // const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/signIn');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isLoading, navigate, isSuccess]);

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
