import { useParams } from 'react-router-dom';

import { DataGrid, GridRowsProp, GridColDef,GridToolbar } from '@mui/x-data-grid';

import ContentWrapper from '../components/ContentWrapper.tsx';
import { Typography } from '@mui/material';

const mockData = [
  {
    id: 'RQUJEJ4DDOQSN4E9YMN2LPY5',
    createdAt: 1697388889,
    creatorId: '0YETAEBJMWBCIPL6HU8LHAW2',
    parentId: 'YVN1UOY5TTKAT9HRERHK2TSN',
    tags: ['KTKBU98SFRHK2KSO0YETA52A', 'MWB39PM68U8CHAW2315LQVGP'],
    value: 2000,
    description: 'Prodal jsem hotdog',
    counterpartId: null,
  },
  {
    id: 'OZ24YFQLAXZDX0A7V5MM5BK3',
    createdAt: 1697387889000,
    creatorId: '0YETAEBJMWBCIPL6HU8LHAW2',
    parentId: 'YVN1UOY5TTKAT9HRERHK2TSN',
    tags: ['KTKBU98SFRHK2KSO0YETA52A', 'MWB39PM68U8CHAW2315LQVGP'],
    value: -3000,
    description: 'Kopil jsem hotdog',
    counterpartId: null,
  },
];
const Transactions = () => {
  const { id } = useParams<{ id: string }>();

  const rows: GridRowsProp = mockData.map(item => {
    let result = {
      id: item.id,
      col1: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }),
      col2: item.description,
      col3: (item.value >= 0 ? '▲' : '▼')+ Math.abs(item.value),
    };
    return result;
  });

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Date',minWidth: 100 },
    { field: 'col2', headerName: 'Description',flex: 1 },
    { field: 'col3', headerName: 'Amount'},
  ];
  return (
    <ContentWrapper>
      <Typography variant={'h2'}  fontWeight={800} marginBottom={2}>
          Transactions
        </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar }} autoHeight />
      </div>
    </ContentWrapper>
  );
};

export default Transactions;
