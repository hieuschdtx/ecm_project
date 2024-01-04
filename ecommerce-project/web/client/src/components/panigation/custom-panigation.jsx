import { Pagination, Stack, ThemeProvider, createTheme } from '@mui/material';
import { primary } from 'src/theme/palette';

const themes = createTheme({
  palette: {
    primary: {
      main: primary.red,
    },
  },
});

export default function CustomPanigation({ count, page, defaultValue, onChange }) {
  return (
    <ThemeProvider theme={themes}>
      <Stack spacing={2}>
        <Pagination
          count={count}
          color="primary"
          page={page}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </Stack>
    </ThemeProvider>
  );
}
