import { Box } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEdit from './pages/AddEdit';
import ProductDetailPage from './pages/Detail';
import ProductListPage from './pages/List';

function ProductFeature() {
  const match = useRouteMatch();

  return (
    <Box>
      <Switch>
        <Route exact path={match.path} component={ProductListPage} />
        <Route path={`${match.path}/addProduct`} component={AddEdit} />
        <Route path={`${match.path}/:productId`} component={ProductDetailPage} />
      </Switch>
    </Box>
  );
}

export default ProductFeature;
