import AuthForm from '../../../component/Form/AuthForm/AuthForm';
import ButtonForm from '../../../component/Form/ButtonForm/ButtonForm';
import InputForm from '../../../component/Form/InputForm/InputForm';
import TitleForm from '../../../component/Form/TitleForm/TitleForm';

const ResetPassPage = () => {
  return (
    <>
      <TitleForm titleName="Reset" subtitleName="Verification code sent to" />
      <AuthForm margin_block_start>
        <InputForm
          name="email"
          type="email"
          label="E-Mail"
          placeholder="Enter your email"
          errorMessage="Email is required"
        />
        <InputForm
          name="code"
          type="text"
          label="Code"
          placeholder="Enter code"
          errorMessage="Code is required"
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

export default ResetPassPage;
