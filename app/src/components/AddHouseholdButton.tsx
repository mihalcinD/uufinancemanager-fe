import { Box, Button, IconButton, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState, ChangeEvent } from 'react';
import ModalBox from './ModalBox.tsx';
import { useHouseholdsContext } from '../context/HouseholdsContext.tsx';

const AddHouseholdButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { createHousehold } = useHouseholdsContext();
  const onSubmit = async () => {
    if (name.length > 0) {
      await createHousehold({ name });
      setOpenModal(false);
    } else {
      setError(true);
    }
  };
  return (
    <>
      <IconButton
        size="small"
        aria-label="Home page"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={() => setOpenModal(true)}>
        <AddCircleOutlineIcon />
      </IconButton>
      <ModalBox open={openModal} handleClose={() => setOpenModal(false)} title={'Create household'}>
        <Box display={'flex'} flexDirection={'column'} gap={7} mt={5}>
          <TextField
            label={'Household name'}
            value={name}
            error={error}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(false);
              setName(event.target.value);
            }}
          />
          <Button variant={'contained'} onClick={onSubmit} color={'primary'}>
            Create
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};
export default AddHouseholdButton;
