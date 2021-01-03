import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
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
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <NavLink
            exact
            to="/"
            className={classes.title}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <Button color="inherit">Home</Button>
          </NavLink>

          <NavLink exact to="/products" style={{ textDecoration: 'none', color: 'white' }}>
            <Button color="inherit">Product</Button>
          </NavLink>
          <NavLink exact to="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <CustomizedCart style={{ color: 'white' }} />
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
