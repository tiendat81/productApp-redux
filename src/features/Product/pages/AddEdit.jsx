import { Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import ProductForm from '../components/ProductForm';

const DEFAULT_CATEGORY_ID = 'c45eca94-70ef-4264-8714-df482e3d0eff';

// set default image incase of the user did not add url
// need to find another solution
const DEFAULT_IMAGES = [
  'https://media3.scdn.vn/img2/2018/1_18/wcapkP.jpg',
  'https://media3.scdn.vn/img2/2018/1_18/nZectg.jpg',
];

function AddEdit(props) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // edit mode will bind the data to the form
  useEffect(() => {
    if (props.location?.state?.product) {
      setSelectedProduct({
        name: '',
        shortDescription: '',
        description: '',
        originalPrice: 0,
        salePrice: 0,
        images: [],
        ...props.location.state?.product,
      });
    }
  }, [props.location.state?.product]);

  const handleFormSubmit = async (formValues) => {
    const isAdd = !selectedProduct;
    if (isAdd) {
      // convert array object images to single array
      const listImage = formValues?.images ? formValues?.images.map((image) => image.image) : null;

      let payload = {
        id: new Date().getTime().toString(),
        name: formValues.name,
        shortDescription: formValues.shortDescription,
        description: formValues.description,
        originalPrice: formValues.originalPrice,
        salePrice: formValues.salePrice,
        isPromotion: 0,
        promotionPercent: 0,
        images: listImage || DEFAULT_IMAGES,
        isFreeShip: false,
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
        categoryId: DEFAULT_CATEGORY_ID,
      };
      await productApi.add(payload);
      return;
    }

    // todo : edit product
    console.log('edit form', formValues);
  };

  return (
    <Container>
      {props.location.state.addMode && (
        <Typography component="h2" variant="h5">
          Add new product
        </Typography>
      )}

      {props.location.state.editMode && (
        <Typography component="h2" variant="h5">
          Editing product
        </Typography>
      )}

      <ProductForm onSubmit={handleFormSubmit} initialValues={selectedProduct} />
    </Container>
  );
}

export default AddEdit;
