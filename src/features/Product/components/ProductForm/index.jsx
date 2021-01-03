import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Typography } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

ProductForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  initialValues: null,
  onSubmit: null,
};

function ProductForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    name: yup.string('Accept string only').required('Please enter a product name'),
    shortDescription: yup
      .string('Accept string only')
      .required('Please enter a product description'),
    originalPrice: yup.number('Should be a number').min(0).required(),
    salePrice: yup.number('Should be a number').min(0),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      shortDescription: '',
      originalPrice: 0,
      salePrice: 0,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      console.log(values);
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
      <Typography component="h2" variant="h5">
        Product Form
      </Typography>
      <InputField name="name" label="Product name" form={form} />
      <InputField name="shortDescription" type="text" label="Product description" form={form} />
      <InputField name="originalPrice" type="number" min="0" label="Price" form={form} />{' '}
      {/** min = 0 khong work */}
      <InputField name="salePrice" type="number" min="0" label="Sale" form={form} />
      <Button disabled={isSubmitting} type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

export default ProductForm;
