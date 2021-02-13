import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector } from 'react-redux';
import { itemCountSelector } from '../../selectors';

function Cart() {
  const itemCount = useSelector(itemCountSelector);

  return (
    <Badge badgeContent={itemCount} color="secondary">
      <ShoppingCartIcon />
    </Badge>
  );
}

export default Cart;
