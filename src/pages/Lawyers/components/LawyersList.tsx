import { Box, Button } from '@mui/joy';
import { LawyerMetadata } from '../../../types/globalTypes';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

type LawyerListProps = {
  lawyers: LawyerMetadata[] | undefined;
};

export const LawyersList = ({ lawyers }: LawyerListProps) => {
  const navigate = useNavigate();

  const columns: GridColDef<LawyerMetadata>[] = [
    {
      field: 'fullName',
      headerName: "Ім'я",
      width: 200,
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'hourly_rate',
      headerName: 'Ціна консультації (₴)',
      width: 175,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'averageMark',
      headerName: 'Середня оцінка',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'profile',
      headerName: '',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (law) => (
        <Button
          onClick={() => {
            navigate(`/lawyer/${law.row.id.toString()}`);
          }}
        >
          Профіль
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={lawyers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 13,
            },
          },
        }}
        pageSizeOptions={[13]}
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableMultipleRowSelection
        disableRowSelectionOnClick
        disableColumnResize
      />
    </Box>
  );
};
