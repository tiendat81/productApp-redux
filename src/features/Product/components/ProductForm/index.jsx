import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import ImageField from 'components/FormFields/ImageField';
import InputField from 'components/FormFields/InputField';
import InputNumberField from 'components/FormFields/InputNumberField';
import RadioField from 'components/FormFields/RadioField';
import SelectField from 'components/FormFields/SelectField';
import TextAreaField from 'components/FormFields/TextAreaField';
import { categoryList } from 'constants/common';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
    name: yup.string().required('Product name is required.'),
    shortDescription: yup.string().required('Short description is required.'),
    description: yup.string().required('Description is required.'),
    originalPrice: yup
      .number()
      .min(0, 'Price must be equal or greater than zero.')
      .typeError('Price is required.'),
    salePrice: yup
      .number()
      .typeError('Sale price is required.')
      .min(0, 'Sale price must be equal or greater than zero.'),
    isPromotion: yup.string(),
    promotionPercent: yup
      .number()
      .min(0, 'Promotion percent must be equal or greater than zero.')
      .max(100, 'Promotion percent must be less than or equal to 100.')
      .typeError('Promotion percent is required.'),
    isFreeShip: yup.string(),
    images: yup.array().of(
      yup.object().shape({
        image: yup.string().url('Please enter the right URL.').required('URL is required.'),
      })
    ),
    categoryId: yup.string().required('Category is required.'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      name: '',
      shortDescription: '',
      description: '',
      originalPrice: 0,
      salePrice: 0,
      isPromotion: '0',
      promotionPercent: 0,
      isFreeShip: 'false',
      images: [],
      categoryId: '',
    },
    resolver: yupResolver(schema),
  });

  const { setValue } = form;

  useEffect(() => {
    setValue('name', initialValues?.name || '');
    setValue('shortDescription', initialValues?.shortDescription || '');
    setValue('description', initialValues?.description || '');
    setValue('originalPrice', initialValues?.originalPrice || 0);
    setValue('salePrice', initialValues?.salePrice || 0);
    setValue('promotionPercent', initialValues?.promotionPercent || 0);
    setValue('isPromotion', initialValues?.isPromotion || '0');
    setValue('isFreeShip', initialValues?.isFreeShip || 'false');
    setValue('images', initialValues?.images || [{}]);
    setValue('categoryId', initialValues?.categoryId || '');
  }, [initialValues, setValue]);

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
      form.reset();
    }
  };

  const { isSubmitting, isValid, isValidating } = form.formState;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
      <InputField name="name" label="Product name" form={form} />
      <InputField
        name="shortDescription"
        type="text"
        label="Product short description"
        form={form}
      />
      <TextAreaField name="description" type="text" label="Product description" form={form} />
      <InputNumberField
        name="originalPrice"
        type="number"
        inputProps={{
          min: '0',
        }}
        label="Price"
        form={form}
      />
      <InputNumberField
        name="salePrice"
        type="number"
        inputProps={{
          min: '0',
        }}
        label="Sale price"
        form={form}
      />
      <InputNumberField
        name="promotionPercent"
        type="number"
        inputProps={{
          min: '0',
          max: '100',
        }}
        label="Promotion Percent"
        form={form}
      />
      <ImageField name="images" label="Image" form={form} />
      <RadioField
        name="isPromotion"
        label="Promotion"
        form={form}
        options={[
          { value: '1', label: 'Yes' },
          { value: '0', label: 'No' },
        ]}
      />
      <RadioField
        name="isFreeShip"
        label="Free Shipping"
        form={form}
        options={[
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ]}
      />
      <SelectField
        name="categoryId"
        label="Category"
        form={form}
        options={categoryList.map((category) => ({
          value: category.categoryId,
          label: category.name,
        }))}
      />
      <Button
        disabled={isSubmitting || !isValid || isValidating}
        type="submit"
        color="primary"
        variant="contained"
      >
        {initialValues ? 'Update' : 'Add'}
      </Button>
    </Box>
  );
}

export default ProductForm;
