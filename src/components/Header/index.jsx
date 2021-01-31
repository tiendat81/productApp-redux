import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import CustomizedCart from 'features/Cart/components/ShoppingCart';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: '20px',
    color: ' #1e1e27',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  home: {
    color: '#FF9900',
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <NavLink
            exact
            to="/"
            className={classes.title}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Nordic<span className={classes.home}>Shop</span>
          </NavLink>

          <NavLink exact to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Home</Button>
          </NavLink>
          <NavLink to="/products" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Product</Button>
          </NavLink>
          <NavLink to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <CustomizedCart style={{ color: 'white' }} />
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
