import { FakeUserService } from './services/FakeUserService';
import { UserService } from './services/UserService';
import { UserProvider } from './contexts/userContext';
import { UserBody } from './UserBody';
import IUserService from './services/IUserService';

export function Users() {
  let userService: IUserService;
  if (import.meta.env.VITE_FAKE) {
    userService = new FakeUserService();
  } else {
    userService = new UserService();
  }

  return (
    <UserProvider service={userService}>
      <UserBody />
    </UserProvider>
  );
}
