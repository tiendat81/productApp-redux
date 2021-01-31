import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import slider from '../../../../assets/images/slider_1.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    maxWidth: '100%',
    height: '700px',

    backgroundImage: `url(${slider})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },

  sliderContainer: {
    marginLeft: '50px',
  },

  sliderContent: {},

  secondHeading: {
    fontWeight: '500',
    textTransform: 'uppercase',
    fontSize: '16px',
    marginBottom: '30px',
  },

  firstHeading: {
    fontWeight: '400',
    lineHeight: '1',
    fontSize: '40px',
  },

  shopNowBtn: {
    textDecoration: 'none',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.sliderContainer}>
        <Box className={classes.sliderContent}>
          <Box component="h6" className={classes.secondHeading}>
            Spring / Summer Collection 2021
          </Box>
          <Box component="h1" className={classes.firstHeading}>
            Get up to 30% Off New Arrivals
          </Box>
          <Link to="products" className={classes.shopNowBtn}>
            <Button variant="contained" color="primary">
              Shop now
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;
