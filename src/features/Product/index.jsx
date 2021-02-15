import { Box } from '@material-ui/core';
import React, { lazy, Suspense } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

const AddEdit = lazy(() => import('./pages/AddEdit'));
const ProductDetailPage = lazy(() => import('./pages/Detail'));
const ProductListPage = lazy(() => import('./pages/List'));

function ProductFeature() {
  const match = useRouteMatch();

  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={match.path} component={ProductListPage} />
          {/* <Route path={`${match.path}/?_page=:page`} component={ProductListPage} /> */}
          <Route path={`${match.path}/addEditProduct`} component={AddEdit} />
          <Route path={`${match.path}/:productId`} component={ProductDetailPage} />
        </Switch>
      </Suspense>
    </Box>
  );
}

export default ProductFeature;
