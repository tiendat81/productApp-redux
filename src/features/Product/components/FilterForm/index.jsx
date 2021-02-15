import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@material-ui/core';
import SelectField from 'components/FormFields/SelectField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

FilterForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

FilterForm.defaultProps = {
  initialValues: null,
  onSubmit: null,
};

function FilterForm({ initialValues, onSubmit }) {
  const schema = yup.object().shape({
    filter: yup.string('Accept string only'),
  });

  const form = useForm({
    mode: 'onBlur',
    defaultValues: initialValues || {
      filter: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
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
      <SelectField
        name="filter"
        label="filter"
        form={form}
        options={[
          { value: 'hcm', label: 'TP. HCM' },
          { value: 'pt', label: 'Phan Thiết' },
          { value: 'td', label: 'Thủ Đức' },
          { value: 'dn', label: 'Đà Nẵng' },
          { value: 'hn', label: 'Hà Nội' },
        ]}
      />
    </Box>
  );
}

export default FilterForm;
