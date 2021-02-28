import { Box, Button, ButtonGroup, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { totalSelector } from 'features/Cart/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from 'utilities/common';
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
    backgroundColor: '#f0f0f5',
    borderRadius: 5,
  },
  originalPrice: {
    textDecoration: 'line-through',
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
        <Box display="flex" justifyContent="center" alignItems="flex-start" flexWrap="wrap" mt={5}>
          <Box>
            <img height="auto" width="100%" src={noCartItemImg} alt="noCartItemImg" />
          </Box>
          <Box ml={3}>
            <Typography variant="h4">Your Cart is empty</Typography>
          </Box>
        </Box>
      ) : (
        <Box mt={5}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={8} md={9}>
              {cartItems.map((item) => (
                <Box key={item.product.id}>
                  <Grid container spacing={0} className={classes.root}>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box
                        component="img"
                        src={item?.product?.images?.[0]}
                        maxHeight="100%"
                        maxWidth="100%"
                      ></Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box mt={1} pl={1}>
                        <Typography>{item.product.name}</Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onRemoveAllFromCart?.(item)}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box display="flex" flexDirection="column">
                        <Box component="span" mt={1}>
                          <Typography variant="h6">
                            {currencyFormat(item.product?.salePrice)} ₫
                          </Typography>
                          {item.product.promotionPercent > 0 && (
                            <Box>
                              <Typography>
                                <span textDecoration="line-through">
                                  {currencyFormat(item.product.originalPrice)} ₫
                                </span>
                                <span> | -{currencyFormat(item.product?.promotionPercent)}%</span>
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                      <Box mt={1}>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                          <Button
                            disabled={item.quantity === 1}
                            onClick={() => onDecreaseItem?.(item)}
                          >
                            -
                          </Button>
                          <Button disabled>{item.quantity}</Button>
                          <Button onClick={() => onIncreaseItem?.(item)}>+</Button>
                        </ButtonGroup>
                      </Box>
                    </Grid>
                    {cartItems.length > 1 && <hr />}
                  </Grid>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Box p={2} bgcolor="#f0f0f5" borderRadius={5}>
                <Typography variant="h6">Total: {currencyFormat(totalAmount)} ₫</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default CartList;
