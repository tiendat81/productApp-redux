import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';

function PageNotFound() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={1}
      m={1}
      bgcolor="background.paper"
    >
      <Typography variant="h4">Sorry we couldn't find that page</Typography>
      <Button href="/" color="primary">
        Go to NordicShop's home page.
      </Button>
    </Box>
  );
}

export default PageNotFound;
