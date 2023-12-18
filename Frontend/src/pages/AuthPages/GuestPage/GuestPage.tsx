import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';
import { IGuestForm } from '../../../utils/interface';
import styles from './GuestPage.module.scss';
import AuthForm from '../../../component/Form/AuthForm/AuthForm';

const GuestPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGuestForm>({
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <>
      <TitleForm titleName="Welcome" subtitleName="Please choose how you want to proceed" />
      <div className={styles.buttons}>
        <ButtonForm type="button" not_active margin_inline_end>
          <NavLink to="/signIn">Sign in</NavLink>
        </ButtonForm>
        <ButtonForm type="button">
          <NavLink to="/">Guest</NavLink>
        </ButtonForm>
      </div>
      <p className={styles.info}>You can create an account later</p>
      <AuthForm onSubmit={onSubmit}>
        <InputForm
          id="nickname"
          type="text"
          placeholder="Enter your nickname"
          label="Nickname"
          errorMessage={errors.nickname?.message}
          {...register('nickname', { required: 'Nickname is required' })}
        />

        <ButtonForm type="submit" margin_inline_end>
          Sign Up
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default GuestPage;
