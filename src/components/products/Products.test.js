import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from '../../context/ProductContext';
import Product from './index';

test('renders product', () => {
  const view = render(
    <BrowserRouter>
      <ProductProvider value={{ products: 1 }}>
        <Product />
      </ProductProvider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = view.getByTestId('products');
  expect(title).toBeInTheDocument();
});
