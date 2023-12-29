import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { TypeOf, object, string } from 'zod';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { useRegisterGuestMutation } from '../../../store/api/guestApi';
import styles from './GuestPage.module.scss';

const registerSchema = object({
  nickname: string().min(1, 'Nickname is required').max(20, 'Nickname is too long'),
});

export type TRegisterInput = TypeOf<typeof registerSchema>;

const GuestPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const [registerGuest, { isLoading, isSuccess }] = useRegisterGuestMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/chats');
    }
  }, [isLoading, navigate, isSuccess]);

  const onSubmit = handleSubmit(async (data) => {
    registerGuest(data);
  });
  return (
    <>
      <TitleForm titleName="Welcome" subtitleName="Please choose how you want to proceed" />
      <div className={styles.buttons}>
        <NavLink to="/signIn">
          <ButtonForm type="button" not_active>
            Sign in
          </ButtonForm>
        </NavLink>
        <NavLink to="/">
          <ButtonForm type="button">Guest</ButtonForm>
        </NavLink>
      </div>
      <p className={styles.info}>You can create an account later</p>
      <AuthForm onSubmit={onSubmit}>
        <InputForm
          id="nickname"
          placeholder="Enter your nickname"
          label="Nickname"
          errorMessage={errors.nickname?.message}
          {...register('nickname')}
        />

        <ButtonForm type="submit" margin_block_start>
          Sign Up
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default GuestPage;
