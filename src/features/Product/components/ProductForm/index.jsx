import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import ImageField from 'components/FormFields/ImageField';
import InputField from 'components/FormFields/InputField';
import InputNumberField from 'components/FormFields/InputNumberField';
import RadioField from 'components/FormFields/RadioField';
import TextAreaField from 'components/FormFields/TextAreaField';
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
    name: yup.string('Accept string only').required('Please enter a product name'),
    shortDescription: yup
      .string('Accept string only')
      .required('Please enter a product short description'),
    description: yup.string('Accept string only').required('Please enter a product description'),
    originalPrice: yup
      .number()
      .typeError('Price must be a number')
      .positive('Price must be greater than zero')
      .required('Price is required'),
    salePrice: yup
      .number()
      .typeError('Sale price must be a number')
      .positive('Sale price must be greater than zero')
      .required('Sale price is required'),
    isPromotion: yup.string(),
    promotionPercent: yup
      .number()
      .max(100, 'Promotion Percent must be less than or equal to 100')
      .typeError('Promotion Percent must be a number')
      .positive('Promotion Percent must be equal or greater than zero')
      .required('Promotion Percent is required'),
    isFreeShip: yup.string(),
    images: yup.array().of(
      yup.object().shape({
        image: yup
          .string()
          .url('Please enter the right url')
          .required('Please enter url for image'),
      })
    ),
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
    },
    resolver: yupResolver(schema),
  });

  const { setValue } = form;

  useEffect(() => {
    // field array need an array object, but images return a flat array so that convert flat array to array object
    const convertFlatImageArrayToArrayObj = () => {
      let imageList = [];
      imageList = initialValues.images.map((image) => ({ image: image }));
      return imageList;
    };

    setValue('name', initialValues ? initialValues.name : '');
    setValue('shortDescription', initialValues?.shortDescription || '');
    setValue('description', initialValues?.description || '');
    setValue('originalPrice', initialValues?.originalPrice || 0);
    setValue('salePrice', initialValues?.salePrice || 0);
    setValue('promotionPercent', initialValues?.promotionPercent || 0);
    setValue('isPromotion', initialValues?.isPromotion.toString() || '0');
    setValue('isFreeShip', initialValues?.isFreeShip.toString() || 'false');
    setValue('images', initialValues?.images ? convertFlatImageArrayToArrayObj() : [{}]);
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
      <Button
        disabled={isSubmitting || !isValid || isValidating}
        type="submit"
        color="primary"
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}

export default ProductForm;
