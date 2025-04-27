import { FakeUserService } from './services/FakeUserService';
import { UserProvider } from './contexts/userContext';
import { UserBody } from './UserBody';

export function Users() {
  const userService = new FakeUserService();
  return (
    <UserProvider service={userService}>
      <UserBody />
    </UserProvider>
  );
}
