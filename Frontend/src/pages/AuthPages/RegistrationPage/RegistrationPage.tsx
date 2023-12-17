import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';

const RegistrationPage = () => {
  return (
    <>
      <TitleForm titleName="Registration" subtitleName="Please fill in the data" />

      <AuthForm margin_block_start>
        <InputForm
          name="nickname"
          type="text"
          label="Nickname"
          placeholder="Enter your nickname"
          errorMessage="Nickname is required"
        />
        <InputForm
          name="username"
          type="text"
          label="Username"
          placeholder="Enter your username"
          errorMessage="Username is required"
        />
        <InputForm
          name="email"
          type="email"
          label="E-Mail Adress"
          placeholder="Enter your email"
          errorMessage="Email is required"
        />
        <InputForm
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          errorMessage="Password is required"
        />

        <ButtonForm type="submit" margin_block_start>
          Submit
        </ButtonForm>
      </AuthForm>
    </>
  );
};

export default RegistrationPage;
