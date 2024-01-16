import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ModalBox from '../../ModalBox.tsx';
import { useTransactionsContext } from '../../../context/TransactionsContext.tsx';

const AddTransactionButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const { createTransaction } = useTransactionsContext();

  const onSubmit = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button variant={'contained'} color={'inherit'} onClick={() => setOpenModal(true)}>
        <Typography color="inherit" fontWeight={700}>
          Add transaction
        </Typography>
      </Button>
      <ModalBox open={openModal} handleClose={() => setOpenModal(false)} title={'Add transaction'}>
        <Box display={'flex'} flexDirection={'column'} gap={7} mt={5}>
          <Button variant={'contained'} onClick={onSubmit} color={'primary'}>
            Add
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};
export default AddTransactionButton;
