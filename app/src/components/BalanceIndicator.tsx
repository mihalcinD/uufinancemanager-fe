import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

type Props = {
  value: number;
  size?: 'small' | 'medium' | 'large';
};
const BalanceIndicator = ({ value, size }: Props) => {
  return (
    <ArrowDropDownCircleIcon
      sx={{ color: value > 0 ? '#27c947' : '#c92727', rotate: value > 0 ? '180deg' : '0deg' }}
      fontSize={size ?? 'small'}
    />
  );
};
export default BalanceIndicator;
