import { Box, Button, ButtonGroup, CardActionArea, Container, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { currencyFormat } from 'utilities/currency';
import Carousel from 'react-material-ui-carousel';

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
    marginLeft: '10px',
    borderRadius: '5px',
    // backgroundColor: '#f0f5f5',
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
                <Carousel animation="slide" autoPlay={false}>
                  {product.images.map((image, i) => (
                    <CardMedia
                      key={i}
                      component="img"
                      alt="Image"
                      height="300"
                      image={image}
                      title="Image"
                    />
                  ))}
                </Carousel>
              </CardActionArea>
            </Card>
          </Box>
        </Box>
        <Box className={classes.mainContent}>
          <Typography color="textSecondary" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="body2" component="p">
            {currencyFormat(product.salePrice)}đ
          </Typography>
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
