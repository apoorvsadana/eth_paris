import {useNavigationContext} from '../../bootstrap/Navigation/Navigation.context';
import AuthStorage from '../authStorage';

type AuthResponse = {
  login: () => void;
  logout: () => Promise<void>;
};

const useAuth = (): AuthResponse => {
  const {setStack} = useNavigationContext();

  const login = async (): Promise<void> => {
    setStack('app');
  };

  const logout = async () => {
    await AuthStorage.resetCredentialsOnLogout();
    setStack('login');
  };

  return {login, logout};
};

export default useAuth;
