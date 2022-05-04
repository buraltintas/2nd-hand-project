import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ProductProvider } from '../../context/ProductContext';
import { AuthProvider } from '../../context/AuthContext';
import Product from './index';

test('renders product', () => {
  let mock = jest.fn();

  mock.mockReturnValue(true);

  const view = render(
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <AuthContext.Provider value={{ isLoggedIn: true }}>
            <Product />
          </AuthContext.Provider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const section = view.queryByTestId('product');

  expect(section).toBeNull();
});
