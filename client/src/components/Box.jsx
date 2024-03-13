import * as React from 'react';
import { Box, ThemeProvider } from '@mui/material';
export default function BoxSx() {
    return (
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: '#FFFFFF',
              dark: '#000000',
            },
          },
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: 5,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        />
      </ThemeProvider>
    );
  }

  //https://mui.com/material-ui/react-box/