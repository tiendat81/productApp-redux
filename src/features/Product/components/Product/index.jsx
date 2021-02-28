import { Box, Button, ButtonGroup, CardActionArea, Container, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { currencyFormat } from 'utilities/common';

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
  salePrice: {
    fontSize: '32px',
    lineHeight: '40px',
    marginRight: '8px',
    fontWeight: '500',
  },
  originalPrice: {
    textDecoration: 'line-through',
  },
}));

function Product(props) {
  const { product, addToCart, increaseProduct, decreaseProduct, productQuantity } = props;
  const classes = useStyles();

  const onIncreaseProductClick = () => {
    increaseProduct?.();
  };

  const onDecreaseProductClick = () => {
    decreaseProduct?.();
  };

  return (
    <Container>
      <Box mt={5}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <Box className={classes.root}>
              <Card>
                <CardActionArea>
                  <Carousel animation="slide" autoPlay={false}>
                    {product.images.map((image, i) => (
                      <CardMedia key={i} component="img" alt="Image" image={image} title="Image" />
                    ))}
                  </Carousel>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box>
              <Box>
                <Typography variant="h5" color="textSecondary" gutterBottom>
                  {product.name}
                </Typography>
                <Box bgcolor="#f0f0f5" borderRadius={5} width="fit-content" p={2}>
                  <span className={classes.salePrice}>{currencyFormat(product.salePrice)} ₫</span>
                  <span className={classes.originalPrice}>
                    {currencyFormat(product.originalPrice)} ₫
                  </span>
                  <span> -{product.promotionPercent}%</span>
                </Box>
              </Box>
              <Box mt={2}>
                <Typography component="h6">Quantity</Typography>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button disabled={productQuantity === 1} onClick={onDecreaseProductClick}>
                    -
                  </Button>
                  <Button disabled>{productQuantity}</Button>
                  <Button onClick={onIncreaseProductClick}>+</Button>
                </ButtonGroup>
              </Box>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart({ product, quantity: productQuantity })}
                >
                  Add to cart
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Product;
