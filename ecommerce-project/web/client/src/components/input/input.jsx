import { styled, InputBase } from '@mui/material';
import PropTypes from 'prop-types';
import { primary } from 'src/theme/palette';

export default function Input(props) {
  return <StyledInput {...props} />;
}
Input.propTypes = {
  placeholder: PropTypes.string,
};

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  color: primary.red,
  border: '1px solid black',
}));
