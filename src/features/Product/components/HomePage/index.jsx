import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCarousel from '../Carousel';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '3rem',
  },
  general: {
    display: 'flex',
    flexDirection: 'row',
  },
  trending: {
    marginRight: '2rem',
  },
  discover: {
    textDecoration: 'none',
  },
}));

function HomePage() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.general}>
        <Box className={classes.trending}>Best sellers</Box>
        <Link to="products" className={classes.discover}>
          <Box>Discover</Box>
        </Link>
      </Box>
      <Box>
        <ProductCarousel />
      </Box>
    </Container>
  );
}

export default HomePage;
