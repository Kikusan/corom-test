import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { UseUser } from '../hooks/useUsers';
import { TableUser } from '../services/User';
import { useNotification } from '../../../utils/notifications/NotificationContext';

type FormData = {
  lastname: string;
  firstname: string;
  email: string;
  birthdate: string;
};

type UserFormProps = {
  onClose: () => void;
  refresh: React.Dispatch<React.SetStateAction<TableUser[]>>;
  currentUser?: TableUser;
};

export default function UserForm({
  onClose,
  refresh,
  currentUser,
}: Readonly<UserFormProps>) {
  const formatDateISO = (date: Date) => {
    const isoString = date.toISOString();
    const formattedDate = isoString.split('T')[0];
    return formattedDate;
  };
  const defaultValues: FormData = {
    lastname: currentUser?.lastname ?? '',
    firstname: currentUser?.firstname ?? '',
    email: currentUser?.email ?? '',
    birthdate: currentUser?.birthdate
      ? formatDateISO(currentUser.birthdate)
      : '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const { createUser, getUsers, updateUser } = UseUser();
  const { notify } = useNotification();
  const onSubmit = async (user: FormData) => {
    const userFromFormData = { ...user, birthdate: new Date(user.birthdate) };
    try {
      if (currentUser) {
        await updateUser({ id: currentUser.technicalId, ...userFromFormData });
        notify('User updated.', 'success');
      } else {
        await createUser(userFromFormData);
        notify('User created', 'success');
      }
      const users = await getUsers();

      refresh(users);
    } catch (e: unknown) {
      if (e instanceof Error) notify(e.message, 'error');
      else notify(`something's wrong. Please contact admin`, 'error');
    }
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Controller
        name="lastname"
        control={control}
        rules={{ required: 'Last name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="firstname"
        control={control}
        rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email format',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="birthdate"
        control={control}
        rules={{ required: 'Birth date is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Birth Date"
            type="date"
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!errors.birthdate}
            helperText={errors.birthdate?.message}
            fullWidth
            sx={{
              '& input[type="date"]::-webkit-calendar-picker-indicator': {
                filter: 'invert(1)',
              },
            }}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
