import { Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { TableUser } from '../../services/User';
type Actions = {
  handleDeleteUser: (id: string) => Promise<void>;
  handleUpdateUser: (user: TableUser) => void;
};

const createColumns = (actions: Actions): GridColDef<TableUser[][number]>[] => {
  return [
    {
      field: 'firstname',
      headerName: 'First name',
      width: 200,
      editable: false,
    },
    {
      field: 'lastname',
      headerName: 'Last name',
      width: 200,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    {
      field: 'birthdate',
      headerName: 'birthdate',
      type: 'date',
      width: 250,
      editable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => actions.handleUpdateUser(params.row)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => actions.handleDeleteUser(params.row.technicalId)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
};

export default createColumns;
