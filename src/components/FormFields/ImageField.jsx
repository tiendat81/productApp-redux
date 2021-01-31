import { Box, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import InputField from './InputField';

ImageField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

ImageField.defaultProps = {
  label: '',
  disabled: false,
};

function ImageField(props) {
  const { name, label, form } = props;
  const { fields, append, remove } = useFieldArray({
    name,
    control: form.control,
  });

  const handleAddClick = () => {
    append({
      image: '',
    });
  };

  return (
    <Box mt={1} mb={2}>
      {fields.map((field, idx) => (
        <Box key={field.id} my="16px">
          <Typography>
            {label} {idx + 1}
          </Typography>

          <InputField
            name={`${name}[${idx}].image`}
            label="Image url"
            defaultValue={field.image}
            form={form}
          />

          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: '16px' }}
            onClick={() => remove(idx)}
          >
            Remove url
          </Button>
        </Box>
      ))}

      <Button fullWidth variant="outlined" color="primary" onClick={handleAddClick}>
        Add image url
      </Button>
    </Box>
  );
}

export default ImageField;
