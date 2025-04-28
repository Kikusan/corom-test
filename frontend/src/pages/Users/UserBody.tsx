import UserTable from './components/UserTable/UserTable';
import FormModal from './components/FormModal';
import { useEffect, useState } from 'react';
import { TableUser } from './services/User';
import { UseUser } from './hooks/useUsers';
import { Button } from '@mui/material';

export function UserBody() {
  const [users, setUsers] = useState<TableUser[]>([]);
  const [currentUser, setCurrentUser] = useState<TableUser | undefined>(
    undefined,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getUsers } = UseUser();

  useEffect(() => {
    async function fetchData() {
      const response = await getUsers();
      setUsers(response);
    }
    fetchData();
  }, [getUsers]);

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setCurrentUser(undefined);
          setIsModalOpen(true);
        }}
      >
        Create a user
      </Button>

      <FormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refresh={setUsers}
        currentUser={currentUser}
      />

      <UserTable
        users={users}
        refresh={setUsers}
        setCurrentUser={setCurrentUser}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}
