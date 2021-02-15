import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React from 'react';

ProductPagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

ProductPagination.defaultProps = {
  totalPages: 1,
  onPageChange: null,
  currentPage: null,
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

function ProductPagination({ totalPages, onPageChange, currentPage }) {
  const classes = useStyles();

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <Box className={classes.root}>
      <Pagination
        count={totalPages}
        page={currentPage}
        color="primary"
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
}
export default ProductPagination;
