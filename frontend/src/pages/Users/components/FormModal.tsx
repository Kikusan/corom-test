import { Modal, Box, Typography, IconButton } from '@mui/material';
import UserForm from './UserForm';
import { TableUser } from '../services/User';

type FormModalProps = {
  open: boolean;
  onClose: () => void;
  refresh: React.Dispatch<React.SetStateAction<TableUser[]>>;
  currentUser?: TableUser;
};

export default function FormModal({
  open,
  onClose,
  refresh,
  currentUser,
}: Readonly<FormModalProps>) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {currentUser ? 'update user' : 'Add a new user'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          X
        </IconButton>

        <UserForm
          onClose={onClose}
          refresh={refresh}
          currentUser={currentUser}
        />
      </Box>
    </Modal>
  );
}
