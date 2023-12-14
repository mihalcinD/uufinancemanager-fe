import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbarQuickFilter ,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import ContentWrapper from '../components/ContentWrapper.tsx';
import CategoryById from '../components/CategoryById.tsx';

interface CustomToolbarProps {
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

function CustomToolbar({ setFilterButtonEl }: CustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
      <GridToolbarQuickFilter  />
    </GridToolbarContainer>
  );
}

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const rows: GridRowsProp = mockData.map(item => {
    const categoryList = item.tags.slice(0, 2).map(el => CategoryById(el));
    let result = {
      id: item.id,
      col1: new Date(item.createdAt), //Useful code for formating Dates: Date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric' }),
      col2: item.creatorId, //TODO: Add helper to get UsernameById
      col3: item.description,
      col4: categoryList,
      col5: item.value >= 0 ? 'Income' : 'Outgoing',
      col6: Math.abs(item.value),
    };
    return result;
  });

  const columnsPC: GridColDef[] = [
    { field: 'col1', headerName: 'Date',  type: 'date',     width: 100, 
  },
    {
      field: 'col2',
      headerName: 'Member',
      renderCell: params => <Avatar   sx={{ width: 30, height: 30 }}
      >{params.row.col2.slice(0, 2)}</Avatar>, //TODO: Use color background acordingly to letters(as in /MyProfile)
      width: 50,
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
      width: 10,
    },
    { field: 'col6', headerName: 'Amount', type: 'number', align: 'left', headerAlign: 'left', width: 60 },
  ];

  let mobileColumns = [...columnsPC];
  mobileColumns.splice(2, 1);

  const [filterButtonEl, setFilterButtonEl] = React.useState<HTMLButtonElement | null>(null);

  return (
    <ContentWrapper>
      <Typography variant={'h2'} fontWeight={800} marginBottom={2}>
        Transactions
      </Typography>
      <div style={{ width: '100%' }}>
        <DataGrid
          sx={{
            '& .MuiDataGrid-columnHeaders': { display: 'none' },
          }}
          rows={rows}
          columns={isMobile ? mobileColumns : columnsPC}
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,

            },
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'col1', sort: 'desc' }],
            },
          }}
          autoHeight
        />
      </div>
    </ContentWrapper>
  );
};

export default Transactions;
