import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import productApi from '../../../api/productApi';
import ProductForm from '../components/ProductForm';

function AddEdit(props) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFormSubmit = async (formValues) => {
    const isAdd = !selectedProduct;
    if (isAdd) {
      await productApi.add(formValues);
    }
  };

  return (
    <Container>
      <ProductForm onSubmit={handleFormSubmit} initialValues={selectedProduct} />
    </Container>
  );
}

export default AddEdit;
