import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsVerifiedMutation, useTokenRefreshMutation } from '../store/api/authApi';
import { logoutRememberMe } from '../store/reducers/rememberMe';
import { useAppDispatch, useAppSelector } from '../store/store';

const withAuthCheck = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthCheck = (props: P) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { tokenAccess, tokenRefresh: token } = useAppSelector((state) => state.tokenState);
    const { rememberMe } = useAppSelector((state) => state.rememberMeState);

    const [isVerified, { isError }] = useIsVerifiedMutation();
    const [tokenRefresh] = useTokenRefreshMutation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const checkAccessToken = async () => {
        if (tokenAccess) {
          try {
            await isVerified({ token: tokenAccess });
            setIsLoading(false);
            if (isError) {
              navigate('/signIn');
            }
          } catch (error) {
            navigate('/signIn');
          }
        } else {
          dispatch(logoutRememberMe());
          navigate('/signIn');
        }
      };

      checkAccessToken();

      const timer = setInterval(checkAccessToken, 600000);

      return () => clearInterval(timer);
    }, [navigate, tokenAccess, isVerified, isError, dispatch]);

    useEffect(() => {
      if (rememberMe) {
        const interval = setInterval(() => {
          if (token) {
            tokenRefresh({ refresh: token });
          }
        }, 43200000);

        return () => clearInterval(interval);
      }

      return undefined;
    }, [rememberMe, tokenRefresh, token]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthCheck;
};

export default withAuthCheck;
