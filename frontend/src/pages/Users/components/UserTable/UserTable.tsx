import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { UseUser } from '../../hooks/useUsers';
import { useEffect, useState } from 'react';
import { TableUser } from '../../services/User';
import createColumns from './columns';

export default function UserTable() {
  const { getUsers, deleteUser } = UseUser();
  const [users, setUsers] = useState<TableUser[]>([]);

  const handleDeleteUser = async (astronautId: string) => {
    await deleteUser(astronautId);
    const response = await getUsers();
    setUsers(response);
  };
  const columns = createColumns({ handleDeleteUser });

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      setUsers(response);
    }
    fetchData();
  }, [getUsers]);

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
