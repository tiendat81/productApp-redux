import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

ProductPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

ProductPagination.defaultProps = {
  count: 1,
  onChange: null,
  page: null,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function ProductPagination({ count, onPageChange, page }) {
  const classes = useStyles();

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <Box className={classes.root}>
      <Pagination
        count={count}
        page={page}
        color="primary"
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
}
export default ProductPagination;
