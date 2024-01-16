import { Box, Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import ModalBox from '../../ModalBox.tsx';
import { useTransactionsContext } from '../../../context/TransactionsContext.tsx';

const AddTransactionButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const { createTransaction } = useTransactionsContext();
  const [transactionType, setTransactionType] = useState<-1 | 1>(1);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!description || description.length === 0) {
      setErrorDescription(true);
      return;
    }
    createTransaction({ value: transactionType * amount, description })
      .then(() => setOpenModal(false))
      .catch(() => {
        setErrorDescription(true);
        setError(true);
      });
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
          <ToggleButtonGroup value={transactionType} exclusive onChange={(e, value) => setTransactionType(value)}>
            <ToggleButton value={1}>Income</ToggleButton>
            <ToggleButton value={-1}>Outgoing</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            label={'Amount'}
            value={amount}
            sx={{ alignSelf: 'flex-start' }}
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
          <TextField
            label={'Description'}
            value={description}
            error={errorDescription}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setErrorDescription(false);
              setDescription(event.target.value);
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
export default AddTransactionButton;
