import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import AddTransactionModal from '../../AddTransactionModal.tsx';

const AddTransactionButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button variant={'contained'} color={'inherit'} onClick={() => setOpenModal(true)}>
        <Typography color="inherit" fontWeight={700}>
          Add transaction
        </Typography>
      </Button>
      <AddTransactionModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
export default AddTransactionButton;
