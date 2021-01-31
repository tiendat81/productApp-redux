import { Box, Button, ButtonGroup, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFromCart, removeAllFromCart, removeFromCart } from './cartSlice';
import { totalSelector } from './selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '3rem',
  },
  productSummary: {
    width: '70%',
  },
  productCash: {
    marginLeft: '20px',
    width: '30%',
    backgroundColor: 'rgb(239, 239, 239)',

    padding: '10px',

    fontSize: '16px',
    fontWeight: 'bold',
  },
  cartItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: 'rgb(239, 239, 239)',
    borderRadius: '3px',
    minHeight: '100px',
  },
  cartImgItem: {
    width: '150px',
    height: '150px',
  },
}));

function CartFeature() {
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector(totalSelector);
  const dispatch = useDispatch();

  const handleDecreaseItem = (product) => {
    const action = removeFromCart(product);
    dispatch(action);
  };

  const handleIncreaseItem = (product) => {
    const action = addNewFromCart(product);
    dispatch(action);
  };

  const handleRemoveAllFromCart = (product) => {
    const action = removeAllFromCart(product);
    dispatch(action);
  };

  return (
    <Container className={classes.root}>
      <Box className={classes.productSummary}>
        {cartItems.map((item) => (
          <Box className={classes.cartItems} key={item.product.id}>
            <Box>
              <Box
                className={classes.cartImgItem}
                component="img"
                src={item.product.images[0]}
              ></Box>
            </Box>
            <Box>
              <Box>{item.product.name}</Box>
              <Button onClick={() => handleRemoveAllFromCart(item)}>Remove</Button>
            </Box>

            <Box>
              <Typography>
                {item.product.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
              </Typography>
              <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button disabled={item.quantity === 1} onClick={() => handleDecreaseItem(item)}>
                  -
                </Button>
                <Button disabled>{item.quantity}</Button>
                <Button onClick={() => handleIncreaseItem(item)}>+</Button>
              </ButtonGroup>
            </Box>
          </Box>
        ))}
      </Box>
      {cartItems.length > 0 && (
        <Box className={classes.productCash}>
          <Box>Total: {totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Box>
        </Box>
      )}
    </Container>
  );
}

export default CartFeature;
