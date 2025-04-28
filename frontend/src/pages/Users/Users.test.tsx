import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FakeUserService } from './services/FakeUserService';
import { UserProvider } from './contexts/userContext';
import { UserBody } from './UserBody';
import { NotificationProvider } from '../../utils/notifications/NotificationContext';
describe('user page', () => {
  beforeEach(async () => {
    const userService = new FakeUserService();
    render(
      <NotificationProvider>
        <UserProvider service={userService}>
          <UserBody />
        </UserProvider>
      </NotificationProvider>,
    );
    await act(async () => {});
  });
  it('should display the users', async () => {
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

  it('should open user creation modal', async () => {
    const userCreationButton = screen.getByText('Create a user');
    await userEvent.click(userCreationButton);
    expect(screen.getByText(/Add a new user/i)).toBeDefined();
  });

  it('should open user edition modal', async () => {
    const userDeleteButtons = screen.getAllByText('Edit');
    await userEvent.click(userDeleteButtons[0]);
    expect(screen.getByText(/update user/i)).toBeDefined();
  });

  it('should delete user when clicking on delete button', async () => {
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
