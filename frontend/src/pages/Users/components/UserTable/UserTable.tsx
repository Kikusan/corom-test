import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { UseUser } from '../../hooks/useUsers';
import createColumns from './columns';
import { TableUser } from '../../services/User';

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

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);
    const response = await getUsers();
    refresh(response);
  };

  const handleUpdateUser = async (user: TableUser) => {
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
