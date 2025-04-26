import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FakeUserService } from './services/FakeUserService';
import UserTable from './components/UserTable/UserTable';
import { UserProvider } from './contexts/userContext';
describe('user page', () => {
  const userService = new FakeUserService();
  it('should display the users', async () => {
    render(
      <UserProvider service={userService}>
        <UserTable />
      </UserProvider>,
    );
    await act(async () => {});
    const emails = [
      'alice.dupont@email.com',
      'bob.martin@email.com',
      'claire.bernard@email.com',
      'david.moreau@email.com',
      'emma.lefevre@email.com',
    ];
    emails.forEach((email) => {
      const userEmail = screen.getByText(email);
      expect(userEmail).toBeDefined();
    });
  });

  it('should delete user when clicking on delete button', async () => {
    render(
      <UserProvider service={userService}>
        <UserTable />
      </UserProvider>,
    );
    await act(async () => {});
    const userDeleteButtons = screen.getAllByText('Delete');
    await userEvent.click(userDeleteButtons[0]);
    await act(async () => {});
    const emails = [
      'bob.martin@email.com',
      'claire.bernard@email.com',
      'david.moreau@email.com',
      'emma.lefevre@email.com',
      'francois.petit@email.com',
    ];
    emails.forEach((email) => {
      const userEmail = screen.getByText(email);
      expect(userEmail).toBeDefined();
    });
  });
});
