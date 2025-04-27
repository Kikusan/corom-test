// import { FakeUserService } from './services/FakeUserService';
import { UserService } from './services/UserService';
import { UserProvider } from './contexts/userContext';
import { UserBody } from './UserBody';

export function Users() {
  // const userService = new FakeUserService();
  const userService = new UserService();
  return (
    <UserProvider service={userService}>
      <UserBody />
    </UserProvider>
  );
}
