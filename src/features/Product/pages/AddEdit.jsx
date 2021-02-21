import { Box, Typography } from '@material-ui/core';
import React, { lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import productApi from '../../../api/productApi';

const ProductForm = lazy(() => import('../components/ProductForm'));
const DEFAULT_CATEGORY_ID = 'c45eca94-70ef-4264-8714-df482e3d0eff';

// set default image incase of the user did not add url
// need to find another solution
const DEFAULT_IMAGES = [
  'https://media3.scdn.vn/img2/2018/1_18/wcapkP.jpg',
  'https://media3.scdn.vn/img2/2018/1_18/nZectg.jpg',
];

function AddEdit(props) {
  console.log(props);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // on edit product
    if (location?.productId) {
      (async () => {
        try {
          // setLoading(true);
          const data = await productApi.getById(location.productId);
          setSelectedProduct({
            name: '',
            shortDescription: '',
            description: '',
            originalPrice: 0,
            salePrice: 0,
            isPromotion: '0',
            promotionPercent: 0,
            isFreeShip: 'false',
            images: [],
            ...data,
          });
          // setLoading(false);
        } catch (error) {
          console.log(`Failed to fetch a product detail for editing: ${error} `);
        }
      })();
    }
  }, [location?.productId]);

  const handleFormSubmit = async (formValues) => {
    const isAdd = !selectedProduct;
    // convert array object form field array images to single array for consistent with api
    const listImage = formValues.images
      ? formValues.images.map((image) => image.image)
      : DEFAULT_IMAGES;

    if (isAdd) {
      let payload = {
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
        images: listImage,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
        categoryId: DEFAULT_CATEGORY_ID,
      };
      await productApi.add(payload);
      return;
    }

    // Edit mode
    try {
      let payload = {
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
        images: listImage,
      };
      await productApi.update(payload);
      setSelectedProduct(null);
    } catch (error) {
      console.log('Failed to update product', error);
    }
  };

  return (
    <Box m={5}>
      <Typography component="h2" variant="h5">
        Add new product
      </Typography>
      <ProductForm onSubmit={handleFormSubmit} initialValues={selectedProduct} />
    </Box>
  );
}

export default AddEdit;
