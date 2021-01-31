import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import { useSelector } from 'react-redux';
import { itemCountSelector } from '../../selectors';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function CustomizedCart() {
  const itemCount = useSelector(itemCountSelector);

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={itemCount} color="secondary">
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
