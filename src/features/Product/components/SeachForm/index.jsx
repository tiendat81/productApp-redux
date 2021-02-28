import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import InputField from 'components/FormFields/InputField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

SearchForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  initialValues: null,
  onSubmit: null,
};

function SearchForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    search: yup.string('Accept string only'),
  });

  const form = useForm({
    mode: 'on',
    defaultValues: initialValues || {
      search: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(handleFormSubmit)}
    >
      <InputField name="search" label="Seach product..." form={form} />
    </Box>
  );
}

export default SearchForm;
