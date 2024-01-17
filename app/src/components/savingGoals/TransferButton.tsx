import { ChangeEvent, useState } from 'react';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ModalBox from '../ModalBox.tsx';
import { useHouseholdContext } from '../../context/HouseholdContext.tsx';

type Props = {
  transfer: (amount: number) => Promise<void>;
};
const TransferButton = ({ transfer }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const { household } = useHouseholdContext();

  const onSubmit = () => {
    transfer(amount)
      .then(() => setOpenModal(false))
      .catch(() => {
        setError(true);
      });
  };
  return (
    <>
      <IconButton size={'large'} aria-haspopup="true" color="inherit" onClick={() => setOpenModal(true)}>
        <SwapHorizIcon fontSize={'large'} />
      </IconButton>
      <ModalBox open={openModal} handleClose={() => setOpenModal(false)} title={'Transfer to saving goal'}>
        <Box display={'flex'} flexDirection={'column'} gap={7} mt={5}>
          <TextField
            label={'Amount'}
            value={amount}
            error={error}
            type={'number'}
            sx={{ alignSelf: 'flex-start', minWidth: 200 }}
            InputProps={{
              inputProps: { min: 0, max: household?.balance || 0 },
              startAdornment: <InputAdornment position="start">CZK</InputAdornment>,
            }}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setError(false);
              if (typeof Number(event.target.value) === 'number') setAmount(Number(event.target.value));
            }}
          />
          <Button variant={'contained'} onClick={onSubmit} color={'primary'}>
            Transfer
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};
export default TransferButton;
