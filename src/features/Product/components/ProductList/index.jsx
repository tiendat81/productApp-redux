import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { currencyFormat } from 'utilities/currency';

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
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

ProductList.defaultProps = {
  productList: [],
  onEdit: null,
  onRemove: null,
};

function ProductList(props) {
  const classes = useStyles();
  const { productList, onEdit, onRemove } = props;

  const history = useHistory();

  const onLinktoDetail = (productId) => {
    history.push(`/products/${productId}`);
  };

  const onEditProduct = (product) => {
    if (onEdit) {
      onEdit(product);
      history.push({
        pathname: '/products/addEditProduct',
        state: { product, editMode: true },
      });
    }
  };

  const onRemoveProduct = (product) => {
    onRemove && onRemove(product);
  };

  return (
    <Container>
      <Grid container spacing={1}>
        {productList.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea onClick={() => onLinktoDetail(product.id)}>
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="140"
                  image={product.images && product.images[0]}
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
              <Box pl={2}>
                <span className={classes.salePrice}>{currencyFormat(product.salePrice)} ₫</span>
                {product.promotionPercent > 0 && <span> -{product.promotionPercent}%</span>}
              </Box>
              <CardActions>
                <Button size="small" color="primary" onClick={() => onEditProduct(product)}>
                  Edit
                </Button>
                <Button size="small" color="primary" onClick={() => onRemoveProduct(product)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ProductList;
