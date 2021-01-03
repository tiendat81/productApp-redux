import { Box, Button, ButtonGroup, CardActionArea, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

Product.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
  increaseProduct: PropTypes.func,
  decreaseProduct: PropTypes.func,
  productQuantity: PropTypes.number,
};

Product.defaultProps = {
  product: {},
  addToCart: null,
  increaseProduct: null,
  decreaseProduct: null,
  productQuantity: 0,
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  cart: {},

  container: {
    display: 'flex',
    justifyContent: 'center',
    margin: '3rem auto',
  },

  leftContent: {
    width: '40%',
    borderRadius: '5px',
    backgroundColor: '#e6f2ff',
  },

  mainContent: {
    width: '60%',
    borderRadius: '5px',
    backgroundColor: '#f0f5f5',
  },
}));

function Product(props) {
  const { product, addToCart, increaseProduct, decreaseProduct, productQuantity } = props;
  const classes = useStyles();

  const onIncreaseProductClick = () => {
    increaseProduct && increaseProduct();
  };

  const onDecreaseProductClick = () => {
    decreaseProduct && decreaseProduct();
  };

  return (
    <Container>
      <Box className={classes.container}>
        <Box className={classes.leftContent}>
          <Box className={classes.root}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="300"
                  image={product.images[0]}
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
          </Box>
        </Box>
        <Box className={classes.mainContent}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography color="textSecondary"></Typography>
              <Typography variant="body2" component="p">
                {product.salePrice}
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
              <Button disabled={productQuantity === 1} onClick={onDecreaseProductClick}>
                -
              </Button>
              <Button disabled>{productQuantity}</Button>
              <Button onClick={onIncreaseProductClick}>+</Button>
            </ButtonGroup>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => addToCart({ product, quantity: productQuantity })}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Product;
