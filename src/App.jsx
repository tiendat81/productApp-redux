import { Box } from '@material-ui/core';
import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

const HomePage = lazy(() => import('./features/Product/components/HomePage'));
const AboutPage = lazy(() => import('components/About'));
const Footer = lazy(() => import('components/Footer'));
const Header = lazy(() => import('components/Header'));
const PageNotFound = lazy(() => import('components/PageNotFound'));
const CartFeature = lazy(() => import('features/Cart'));
const ProductFeature = lazy(() => import('features/Product'));

function App() {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/products" component={ProductFeature} />
          <Route path="/about" component={AboutPage} />
          <Route path="/cart" component={CartFeature} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Suspense>
    </Box>
  );
}

export default App;
