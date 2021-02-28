import { Box, Container, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: '90px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box mt={5} mb={5}>
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box>
                <LocalShippingRoundedIcon color="primary" fontSize="large" />
              </Box>
              <Box pl={2}>
                <Typography variant="subtitle1">FREE SHIPPING</Typography>
                <Typography variant="body2">Suffered Alteration in Some Form</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box>
                <LocalAtmRoundedIcon color="primary" fontSize="large" />
              </Box>
              <Box pl={2}>
                <Typography variant="subtitle1">CACH ON DELIVERY</Typography>
                <Typography variant="body2">The Internet Tend To Repeat</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box>
                <ReplayRoundedIcon color="primary" fontSize="large" />
              </Box>
              <Box pl={2}>
                <Typography variant="subtitle1">45 DAYS RETURN</Typography>
                <Typography variant="body2">Making it Look Like Readable</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.paper}>
              <Box>
                <ScheduleRoundedIcon color="primary" fontSize="large" />
              </Box>
              <Box pl={2}>
                <Typography variant="subtitle1">OPENING ALL WEEK</Typography>
                <Typography variant="body2">8AM - 09PM</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          ©2021 All Rights Reserverd. This template is made with ❤ by React
        </Box>
      </Container>
    </Box>
  );
}
