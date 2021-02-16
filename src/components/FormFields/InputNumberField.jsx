import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputProps: PropTypes.object,
};

InputField.defaultProps = {
  label: '',
  disabled: false,
  type: '',
  inputProps: {},
};

function InputField(props) {
  const { name, label, form, disabled, type, inputProps } = props;
  const { errors } = form;
  const errorMessage = errors[name]?.message;
  const hasError = !!errorMessage;

  return (
    <Box mt={1} mb={2}>
      <Controller
        name={name}
        control={form.control}
        render={({ value, onChange, onBlur }) => (
          <TextField
            fullWidth
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            disabled={disabled}
            variant="outlined"
            error={hasError}
            helperText={errorMessage}
            inputProps={inputProps}
            size="small"
          />
        )}
      />
    </Box>
  );
}

export default InputField;
