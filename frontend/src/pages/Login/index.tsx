import { LoginProvider } from './contexts/loginContext';
import { LoginPage } from './LoginPage';
import { LoginService } from './services/LoginService';

export default function LoginContainer() {
  const loginService = new LoginService();
  return (
    <LoginProvider service={loginService}>
      <LoginPage />
    </LoginProvider>
  );
}
