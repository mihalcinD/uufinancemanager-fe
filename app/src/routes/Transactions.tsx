import { useParams } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';

import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from '@mui/x-data-grid';

import ContentWrapper from '../components/ContentWrapper.tsx';
import CategoryById from '../components/CategoryById.tsx';

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
    const categoryList = item.tags.slice(0, 2).map(el => CategoryById(el));
    const member = item.creatorId.slice(0, 2);
    let result = {
      id: item.id,
      col1: new Date(item.createdAt), //Useful code for formating Dates: Date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }),
      col2: member, //TODO: Add helper to get UsernameById
      col3: item.description,
      col4: categoryList,
      col5: item.value >= 0 ? 'Income' : 'Outgoing',
      col6: Math.abs(item.value),
    };
    return result;
  });

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Date', minWidth: 100, type: 'date' },
    {
      field: 'col2',
      headerName: 'Member',
      renderCell: params => <Avatar>{params.row.col2}</Avatar>,//TODO: Use color background acordingly to letters(as in /MyProfile)
      sortable: false,
      filterable: false,
    },
    { field: 'col3', headerName: 'Description', flex: 6 },
    { field: 'col4', headerName: 'Category', flex: 4 },
    {
      field: 'col5',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: ['Income', 'Outgoing'],
      renderCell: params =>
        params.row.col5 === 'Income' ? <div style={{ color: 'green' }}>▲</div> : <div style={{ color: 'red' }}>▼</div>,
      align: 'right',
      headerAlign: 'right',
    },
    { field: 'col6', headerName: 'Amount', type: 'number', align: 'left', headerAlign: 'left' },
  ];
  return (
    <ContentWrapper>
      <Typography variant={'h2'} fontWeight={800} marginBottom={2}>
        Transactions
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          autoHeight
        />
      </div>
    </ContentWrapper>
  );
};

export default Transactions;
