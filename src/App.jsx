import { Box } from '@material-ui/core';
import AboutPage from 'components/About';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PageNotFound from 'components/PageNotFound';
import CartFeature from 'features/Cart';
import ProductFeature from 'features/Product';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import HomePage from './features/Product/components/HomePage';

function App() {
  return (
    <Box>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/about" component={AboutPage} />
        <Route path="/cart" component={CartFeature} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </Box>
  );
}

export default App;
