import { render, act, screen, fireEvent } from '@testing-library/react';
import UserForm from './UserForm';
import { UserProvider } from '../contexts/userContext';
import IUserService from '../services/IUserService';
import userEvent from '@testing-library/user-event';
import { TableUser } from '../services/User';

describe('user form', () => {
  const createUserMock = vi.fn();
  const updateUserMock = vi.fn();
  describe('creation mode', () => {
    beforeEach(async () => {
      vi.clearAllMocks();
      const userService: IUserService = {
        getUsers: vi.fn(),
        createUser: createUserMock,
        deleteUser: vi.fn(),
        updateUser: updateUserMock,
      };
      render(
        <UserProvider service={userService}>
          <UserForm onClose={() => {}} refresh={() => {}} />
        </UserProvider>,
      );
      await act(async () => {});
    });
    it('should have empty fields', async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const birthDateInput = screen.getByLabelText(/Birth Date/i);
      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(birthDateInput).toHaveValue('');
    });

    it('should call the creation method', async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const birthDateInput = screen.getByLabelText(/Birth Date/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await userEvent.type(firstNameInput, 'John');
      await userEvent.type(lastNameInput, 'Doe');
      await userEvent.type(emailInput, 'john.doe@example.com');
      await userEvent.type(birthDateInput, '1990-01-01');

      await userEvent.click(submitButton);

      expect(createUserMock).toHaveBeenCalledWith({
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        birthdate: new Date('1990-01-01'),
      });
    });

    it('should not call the creation method if empty', async () => {
      const submitButton = screen.getByRole('button', { name: /Submit/i });
      await userEvent.click(submitButton);

      const firstNameError = screen.getByText(/First name is required/i);
      const lastNameError = screen.getByText(/Last name is required/i);
      const emailError = screen.getByText(/Email is required/i);
      const birthDateError = screen.getByText(/Birth date is required/i);

      expect(firstNameError).toBeInTheDocument();
      expect(lastNameError).toBeInTheDocument();
      expect(emailError).toBeInTheDocument();
      expect(birthDateError).toBeInTheDocument();
      expect(createUserMock).not.toHaveBeenCalled();
    });

    it('should not call the creation method if invalid email', async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const birthDateInput = screen.getByLabelText(/Birth Date/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      await userEvent.type(firstNameInput, 'John');
      await userEvent.type(lastNameInput, 'Doe');
      await userEvent.type(emailInput, 'john.doeexample.com');
      await userEvent.type(birthDateInput, '1990-01-01');

      await userEvent.click(submitButton);
      const emailError = screen.getByText(/Invalid email format/i);
      expect(emailError).toBeInTheDocument();
      expect(createUserMock).not.toHaveBeenCalled();
    });
  });

  describe('update mode', () => {
    const currentUser: TableUser = {
      id: 2,
      technicalId: '121212-1212',
      firstname: 'Albert',
      lastname: 'Ingalls',
      email: 'A.Ingalls@walnut-groove.com',
      birthdate: new Date('1988-01-22'),
    };
    beforeEach(async () => {
      const userService: IUserService = {
        getUsers: vi.fn(),
        createUser: createUserMock,
        deleteUser: vi.fn(),
        updateUser: updateUserMock,
      };
      render(
        <UserProvider service={userService}>
          <UserForm
            onClose={() => {}}
            refresh={() => {}}
            currentUser={currentUser}
          />
        </UserProvider>,
      );
      await act(async () => {});
    });
    it('should be already filled', async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const birthDateInput = screen.getByLabelText(/Birth Date/i);
      expect(firstNameInput).toHaveValue('Albert');
      expect(lastNameInput).toHaveValue('Ingalls');
      expect(emailInput).toHaveValue('A.Ingalls@walnut-groove.com');
      expect(birthDateInput).toHaveValue('1988-01-22');
    });

    it('should call the update method', async () => {
      const firstNameInput = screen.getByLabelText(/First Name/i);
      const lastNameInput = screen.getByLabelText(/Last Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const birthDateInput = screen.getByLabelText(/Birth Date/i);
      const submitButton = screen.getByRole('button', { name: /Submit/i });

      fireEvent.change(firstNameInput, { target: { value: 'John' } });
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
      fireEvent.change(emailInput, {
        target: { value: 'john.doe@example.com' },
      });
      fireEvent.change(birthDateInput, { target: { value: '1990-01-01' } });

      await userEvent.click(submitButton);
      expect(updateUserMock).toHaveBeenCalledWith({
        id: '121212-1212',
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        birthdate: new Date('1990-01-01'),
      });
    });
  });
});
