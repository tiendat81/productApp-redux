import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {},

  // button add new product section
  sortBtnGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    marginBottom: '1rem',
  },

  button: {
    border: 'none',
    textTransform: 'none',
    marginLeft: '1rem',
  },

  addProduct: {
    textDecoration: 'none',
  },

  mainContent: {
    display: 'flex',
    justifyContent: 'flex-start',

    width: '100%',
  },

  leftMenu: {
    width: '20%',
    borderRadius: '5px',
    // backgroundColor: '#f0f5f5',
    minHeight: '500px',
  },

  category: {
    padding: '1rem .5rem',
    borderBottom: '2px solid  rgb(153, 204, 255)',
  },

  shipping: {
    padding: '1rem .5rem',
    borderBottom: '2px solid  rgb(153, 204, 255)',
  },

  // display product list
  productList: {
    width: '80%',
    borderRadius: '5px',
    backgroundColor: '#e6f2ff',
    minHeight: '500px',
  },

  // link to detail
  linkToDetail: {
    textDecoration: 'none',
  },

  // card
  card: {
    height: '400px',
    position: 'relative',
  },

  cardDescription: {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  price: {
    position: 'absolute',
    bottom: -50,
  },

  editDeleteActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));

ProductList.propTypes = {
  productList: PropTypes.array,
  handleAddClick: PropTypes.func,
  sortAscending: PropTypes.func,
  sortDescending: PropTypes.func,
  isAscending: PropTypes.bool,
  isDescending: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

ProductList.defaultProps = {
  productList: [],
  handleAddClick: null,
  sortAscending: null,
  sortDescending: null,
  isAscending: false,
  isDescending: false,
  onEdit: null,
  onRemove: null,
};

function ProductList(props) {
  const classes = useStyles();
  const {
    productList,
    handleAddClick,
    sortAscending,
    sortDescending,
    isAscending,
    isDescending,
    onEdit,
    onRemove,
  } = props;

  const sortProductDescending = () => {
    sortDescending && sortDescending();
  };

  const sortProductAscending = () => {
    sortAscending && sortAscending();
  };

  return (
    <Container className={classes.container}>
      <Box className={classes.sortBtnGroup}>
        <Box>
          Sort by
          <Button
            className={classes.button}
            color="primary"
            variant={isAscending ? 'contained' : 'outlined'}
            onClick={sortProductAscending}
          >
            Oldest
          </Button>
          <Button
            className={classes.button}
            color="primary"
            variant={isDescending ? 'contained' : 'outlined'}
            onClick={sortProductDescending}
          >
            Newest
          </Button>
        </Box>
        <Link
          to={{
            pathname: '/products/addEditProduct',
            state: { addMode: true },
          }}
          className={classes.addProduct}
        >
          <Button color="primary" startIcon={<Add />} onClick={handleAddClick}>
            Add new product
          </Button>
        </Link>
      </Box>
      <Box className={classes.mainContent}>
        <Box className={classes.leftMenu}>
          <Box className={classes.category}>DANH MỤC SẢN PHẨM</Box>
          <Box className={classes.shipping}>MIỄN PHÍ GIAO HÀNG</Box>
        </Box>
        <Box className={classes.productList}>
          <Box>
            <Grid container spacing={1}>
              {productList.map((product) => (
                <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <Link to={`/products/${product.id}`} className={classes.linkToDetail}>
                        <CardMedia
                          component="img"
                          alt={product.name}
                          height="140"
                          image={product.images && product.images[0]}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.name}
                          </Typography>
                          <Tooltip title={product.shortDescription} placement="top">
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                              className={classes.cardDescription}
                            >
                              {product.shortDescription}
                            </Typography>
                          </Tooltip>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h2"
                            className={classes.price}
                          >
                            {product.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          </Typography>
                        </CardContent>
                      </Link>
                    </CardActionArea>
                    <CardActions className={classes.editDeleteActions}>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={{
                          pathname: '/products/addEditProduct',
                          state: { product, editMode: true },
                        }}
                      >
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => onEdit && onEdit(product)}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => onRemove && onRemove(product)}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ProductList;
