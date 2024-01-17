import { useParams } from 'react-router-dom';
import ContentWrapper from '../components/ContentWrapper';
import {
  Box,
  Button,
  Chip,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { User, useUsersContext } from '../context/UsersContext';
import { useHouseholdContext } from '../context/HouseholdContext';
import { useHouseholdsContext } from '../context/HouseholdsContext';

const FamilySettings = () => {
  const { allUsers: users } = useUsersContext();
  const { household, isLoading, updateHousehold, isPatching } = useHouseholdContext();
  const {refresh} = useHouseholdsContext()

  const [householdName, setHouseholdName] = useState<string>('');
  const [membersIds, setMembersIds] = useState<User[]>([]);

  const handleChange = (event: SelectChangeEvent<User[]>) => {
    const {
      target: { value },
    } = event;
    if (typeof value === 'string') return;
    setMembersIds(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!household?._id) return;
    updateHousehold({
      id: household?._id,
      name: householdName,
      membersIds: membersIds.map(member => member.id),
    }).then(()=>{refresh()});
  };

  useEffect(() => {
    if (isLoading) return;
    setHouseholdName(household?.name || '');
    // @ts-ignore
    setMembersIds(household?.membersIds.map(memberId => users.find(user => user.id === memberId)) || []);
  }, [isLoading]);

  return (
    <>
      <ContentWrapper>
        <Paper elevation={1} sx={{ width: '100%', p: 4 }}>
          <Typography variant={'h5'} component={'h2'} fontWeight={900} mb={3}>
            Household settings
          </Typography>
          <form onSubmit={onSubmit}>
            <Stack spacing={2} direction="column" sx={{ marginBottom: 4 }}>
              <TextField
                sx={{ maxWidth: '300px' }}
                type="text"
                variant="outlined"
                color="secondary"
                label="Household name"
                onChange={e => setHouseholdName(e.target.value)}
                value={householdName}
                fullWidth
                required
              />
              <Select
                label="Members"
                color="secondary"
                multiple
                fullWidth
                value={membersIds}
                onChange={handleChange}
                input={<OutlinedInput color="secondary" label="Chip" />}
                renderValue={selected => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map(value => (
                      <Chip key={value.id} label={`${value.name} ${value.surname}`} />
                    ))}
                  </Box>
                )}>
                {users.map(user => (
                  <MenuItem key={user.id} value={user as unknown as string}>
                    {user.name} {user.surname}
                  </MenuItem>
                ))}
              </Select>
              <Box display={'flex'} justifyContent={'start'} alignItems={'start'}>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </ContentWrapper>
    </>
  );
};

export default FamilySettings;
