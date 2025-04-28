import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { UseUser } from '../../hooks/useUsers';
import createColumns from './columns';
import { TableUser } from '../../services/User';
import { useNotification } from '../../../../utils/notifications/NotificationContext';

type UserTableProps = {
  users: TableUser[];
  refresh: React.Dispatch<React.SetStateAction<TableUser[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<TableUser | undefined>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function UserTable({
  users,
  refresh,
  setCurrentUser,
  setIsModalOpen,
}: Readonly<UserTableProps>) {
  const { getUsers, deleteUser } = UseUser();
  const { notify } = useNotification();

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      const response = await getUsers();
      notify('User deleted.', 'success');
      refresh(response);
    } catch (e: unknown) {
      if (e instanceof Error) notify(e.message, 'error');
      else notify(`something's wrong. Please contact admin`, 'error');
    }
  };

  const handleUpdateUser = (user: TableUser) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const columns = createColumns({ handleDeleteUser, handleUpdateUser });

  return (
    <Box sx={{ height: 400, width: 1100 }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
