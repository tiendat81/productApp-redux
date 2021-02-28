import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { currencyFormat, randomImage } from 'utilities/common';

const useStyles = makeStyles((theme) => ({
  cardDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  salePrice: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
}));

ProductList.propTypes = {
  productList: PropTypes.array,
  onRemove: PropTypes.func,
};

ProductList.defaultProps = {
  productList: [],
  onRemove: null,
};

function ProductList(props) {
  const classes = useStyles();
  const { productList, onRemove } = props;
  const onRemoveProduct = (product) => {
    onRemove?.(product);
  };

  return (
    <Box>
      <Grid container spacing={1}>
        {productList.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    image={product?.images && randomImage(product.images)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h3">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      className={classes.cardDescription}
                    >
                      {product.shortDescription}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <Box pl={2}>
                <span className={classes.salePrice}>{currencyFormat(product.salePrice)} ₫</span>
                {product.promotionPercent > 0 && <span> -{product.promotionPercent}%</span>}
              </Box>
              <CardActions>
                <Link
                  to={{
                    pathname: `/products/addEditProduct/${product.id}`,
                    productId: product.id,
                  }}
                  style={{ textDecoration: 'none' }}
                >
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </Link>
                <Button size="small" color="primary" onClick={() => onRemoveProduct(product)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
