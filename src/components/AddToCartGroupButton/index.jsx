import { Button, ButtonGroup, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Remove } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({}));

AddToCartGroupButton.propTypes = {};

AddToCartGroupButton.propTypes = {
  addToCart: PropTypes.func,
};

AddToCartGroupButton.defaultProps = {
  addToCart: null,
};

function AddToCartGroupButton({ addToCart }) {
  const onAddToCartClick = () => {
    addToCart && addToCart();
  };

  return (
    <Container>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button startIcon={<Add />} onClick={onAddToCartClick}></Button>
        <Button disabled>1</Button>
        <Button startIcon={<Remove />}></Button>
      </ButtonGroup>
    </Container>
  );
}

export default AddToCartGroupButton;
