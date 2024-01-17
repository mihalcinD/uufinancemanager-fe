import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ChangeEvent, useState } from 'react';
import ModalBox from './ModalBox.tsx';
import { useSavingGoalsContext } from '../context/SavingGoalsContext.tsx';

const AddSavingGoalButton = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { createSavingGoal } = useSavingGoalsContext();

  const onSubmit = () => {
    createSavingGoal({ description, name, goal: amount })
      .then(() => {
        setError(false);
        setAmount(0);
        setDescription('');
        setName('');
        setOpenModal(false);
      })
      .catch(err => setError(err));
  };

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
      <ModalBox open={openModal} handleClose={() => setOpenModal(false)} title={'Add Saving Goal'}>
        <Box display={'flex'} flexDirection={'column'} gap={4} mt={5}>
          <TextField
            label={'Name'}
            value={name}
            error={error}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(false);
              setName(event.target.value);
            }}
          />
          <TextField
            label={'Description'}
            value={description}
            error={error}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(false);
              setDescription(event.target.value);
            }}
          />
          <TextField
            label={'Goal'}
            value={amount}
            error={error}
            type={'number'}
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>,
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(false);
              if (typeof Number(event.target.value) === 'number') setAmount(Number(event.target.value));
            }}
          />

          <Button variant={'contained'} onClick={onSubmit} color={'primary'}>
            Add
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};
export default AddSavingGoalButton;
