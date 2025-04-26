import UserTable from './components/UserTable/UserTable';
import { FakeUserService } from './services/FakeUserService';
import { UserProvider } from './contexts/userContext';

export function Users() {
  const userService = new FakeUserService();
  return (
    <UserProvider service={userService}>
      <UserTable />
    </UserProvider>
  );
}
