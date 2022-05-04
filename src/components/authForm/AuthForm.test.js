import React from 'react';
import { render } from '@testing-library/react';
import { ProductProvider } from '../../context/ProductContext';
import { AuthProvider } from '../../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AuthFrom from './index';

test('renders form', () => {
  const view = render(
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <AuthFrom />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const email = view.getByLabelText(/email/i);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const password = view.getByLabelText(/şifre/i);
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});
