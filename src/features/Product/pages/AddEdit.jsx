import { Box, Container, Typography } from '@material-ui/core';
import React, { lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';
import { makeStyles } from '@material-ui/core/styles';

const ProductForm = lazy(() => import('../components/ProductForm'));

// set default image incase of the user did not add url
// need to find another solution
const DEFAULT_IMAGES = [
  'https://media3.scdn.vn/img2/2018/1_18/wcapkP.jpg',
  'https://media3.scdn.vn/img2/2018/1_18/nZectg.jpg',
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
    margin: '0 auto',
  },
}));

function AddEdit(props) {
  const classes = useStyles();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const location = useLocation();

  // convert flat array to array obj to use in field array
  const convertFlatImageArrayToArrayObj = (images) => images.map((image) => ({ image: image }));

  useEffect(() => {
    if (location?.productId) {
      (async () => {
        try {
          const data = await productApi.getById(location.productId);
          setSelectedProduct({
            name: '',
            shortDescription: '',
            description: '',
            originalPrice: 0,
            salePrice: 0,
            promotionPercent: 0,
            categoryId: '',
            ...data,
            images: data?.images ? convertFlatImageArrayToArrayObj(data.images) : [],
            isPromotion: data.isPromotion.toString(),
            isFreeShip: data.isPromotion === false ? 'false' : 'true',
          });
        } catch (error) {
          console.log(`Failed to fetch product detail for editing: ${error} `);
        }
      })();
    }
  }, [location?.productId]);

  const handleFormSubmit = async (formValues) => {
    const isAdd = !selectedProduct;
    // convert array object form field to flat array (consistent with api returns)
    const imageList = formValues?.images ? formValues.images.map((x) => x.image) : DEFAULT_IMAGES;

    if (isAdd) {
      const payload = {
        id: new Date().getTime().toString(),
        name: formValues.name,
        shortDescription: formValues.shortDescription,
        description: formValues.description,
        originalPrice: formValues.originalPrice,
        salePrice: formValues.salePrice,
        promotionPercent: formValues.promotionPercent,
        // due to RadioField return string so that I have to parse to workaround
        isFreeShip: formValues.isFreeShip === 'false' ? false : true,
        // due to RadioField return string so that I have to parse to workaround
        isPromotion: parseInt(formValues.isPromotion),
        images: imageList,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
        categoryId: formValues.categoryId,
      };
      await productApi.add(payload);
      return;
    }

    // Edit mode
    try {
      const payload = {
        id: selectedProduct.id,
        name: formValues.name,
        shortDescription: formValues.shortDescription,
        description: formValues.description,
        originalPrice: formValues.originalPrice,
        salePrice: formValues.salePrice,
        promotionPercent: formValues.promotionPercent,
        // due to RadioField return string so that I have to parse to workaround
        isFreeShip: formValues.isFreeShip === 'false' ? false : true,
        // due to RadioField return string so that I have to parse to workaround
        isPromotion: parseInt(formValues.isPromotion),
        images: imageList,
        updatedAt: new Date().getTime().toString(),
        categoryId: formValues.categoryId,
      };
      await productApi.update(payload);
      setSelectedProduct(null);
    } catch (error) {
      console.log('Failed to update product', error);
    }
  };

  return (
    <Box width="100%">
      <Box className={classes.root} mt={5} mb={3}>
        <Typography component="h2" variant="h5">
          {!!selectedProduct ? 'Edit product' : 'Add new product'}
        </Typography>
        <ProductForm onSubmit={handleFormSubmit} initialValues={selectedProduct} />
      </Box>
    </Box>
  );
}

export default AddEdit;
