import { Box, Button, ButtonGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { totalSelector } from 'features/Cart/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from 'utilities/currency';
import noCartItemImg from '../../../../assets/images/noCartItem.svg';

CartList.propTypes = {
  onDecreaseItem: PropTypes.func,
  onIncreaseItem: PropTypes.func,
  onRemoveAllFromCart: PropTypes.func,
};

CartList.defaultProps = {
  onDecreaseItem: null,
  onIncreaseItem: null,
  onRemoveAllFromCart: null,
};

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
    height: '150px',
    backgroundColor: 'rgb(239, 239, 239)',

    padding: '10px',
    borderRadius: '3px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  cartItems: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',

    backgroundColor: 'rgb(239, 239, 239)',
    borderRadius: '3px',
    minHeight: '100px',
  },
  cartImgItem: {
    width: '150px',
    height: '150px',
    padding: '10px',
  },
  noItem: {
    height: '200px',
  },
}));

function CartList(props) {
  const { onDecreaseItem, onIncreaseItem, onRemoveAllFromCart } = props;
  const classes = useStyles();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector(totalSelector);

  return (
    <Box>
      {cartItems.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" flexWrap="wrap">
          <Box>
            <img className={classes.noItem} src={noCartItemImg} alt="noCartItemImg" />
          </Box>
          <Box>Your Cart is empty</Box>
        </Box>
      ) : (
        <Box className={classes.root}>
          <Box className={classes.productSummary}>
            {cartItems.map((item) => (
              <Box className={classes.cartItems} key={item.product.id}>
                <Box>
                  <Box
                    className={classes.cartImgItem}
                    component="img"
                    src={item?.product?.images[0]}
                  ></Box>
                </Box>
                <Box>
                  <Box>{item.product.name}</Box>
                  <Button color="primary" onClick={() => onRemoveAllFromCart(item)}>
                    Remove
                  </Button>
                </Box>
                <Typography>{currencyFormat(item.product.salePrice)}đ</Typography>
                <Box>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                    style={{ paddingRight: '20px' }}
                  >
                    <Button disabled={item.quantity === 1} onClick={() => onDecreaseItem(item)}>
                      -
                    </Button>
                    <Button disabled>{item.quantity}</Button>
                    <Button onClick={() => onIncreaseItem(item)}>+</Button>
                  </ButtonGroup>
                </Box>
              </Box>
            ))}
          </Box>
          <Box className={classes.productCash}>
            <Box>Total: {currencyFormat(totalAmount)}đ</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CartList;
