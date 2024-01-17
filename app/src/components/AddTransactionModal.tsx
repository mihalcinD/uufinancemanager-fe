import ModalBox from './ModalBox.tsx';
import { Autocomplete, Box, Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useTransactionsContext } from '../context/TransactionsContext.tsx';
import { useTagsContext } from '../context/TagsContext.tsx';
import { TagResponse } from '../types/api/response/tag.ts';

type Props = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
};
const AddTransactionModal = ({ openModal, setOpenModal }: Props) => {
  const { createTransaction } = useTransactionsContext();
  const [transactionType, setTransactionType] = useState<-1 | 1>(1);
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [errorDescription, setErrorDescription] = useState<boolean>(false);
  const { tags, createTag } = useTagsContext();
  const [tag, setTag] = useState<string | TagResponse>();

  const onSubmit = async () => {
    if (!description || description.length === 0) {
      setErrorDescription(true);
      return;
    }
    if (typeof tag === 'string') {
      const _tag = await createTag({ name: tag });
      if (_tag) {
        setTag(_tag);
      }
    }
    createTransaction({
      value: transactionType * amount,
      description,
      ...(tag ? { tags: [(tag as TagResponse)._id] } : {}),
    })
      .then(() => {
        setErrorDescription(false);
        setError(false);
        setAmount(0);
        setDescription('');
        setTag(undefined);
        setOpenModal(false);
      })
      .catch(() => {
        setErrorDescription(true);
        setError(true);
      });
    setOpenModal(false);
  };

  return (
    <ModalBox open={openModal} handleClose={() => setOpenModal(false)} title={'Add transactions'}>
      <Box display={'flex'} flexDirection={'column'} gap={7} mt={5}>
        <ToggleButtonGroup value={transactionType} exclusive onChange={(e, value) => setTransactionType(value)}>
          <ToggleButton value={1}>Income</ToggleButton>
          <ToggleButton value={-1}>Outgoing</ToggleButton>
        </ToggleButtonGroup>
        <Box display={'flex'} flexDirection={'row'} gap={3}>
          <TextField
            label={'Amount'}
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
          {tags && (
            <Autocomplete
              id="tags"
              freeSolo
              sx={{ minWidth: 150 }}
              options={tags.map(option => option)}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                return option.name;
              }}
              onChange={(event, value) => {
                if (value) setTag(value);
              }}
              renderInput={params => <TextField {...params} label="Tags" />}
            />
          )}
        </Box>

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
  );
};
export default AddTransactionModal;
