import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTransactionModal from '../AddTransactionModal.tsx';
import { useState } from 'react';

const AddTransactionButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <IconButton
        size={'large'}
        aria-label="Create transaction"
        aria-haspopup="true"
        color="inherit"
        onClick={() => setOpenModal(true)}>
        <AddCircleOutlineIcon fontSize={'large'} />
      </IconButton>
      <AddTransactionModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};
export default AddTransactionButton;
