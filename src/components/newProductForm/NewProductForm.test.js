import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from '../../context/ProductContext';
import { AuthProvider } from '../../context/AuthContext';
import NewProductForm from './index';

test('renders form', () => {
  const view = render(
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <NewProductForm />
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const productName = view.getByLabelText(/ürün adı/i);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const description = view.getByLabelText(/açıklama/i);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const price = view.getByLabelText(/fiyat/i);
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const category = view.getByLabelText(/kategori/i);
  // eslint-disable-next-line testing-library/prefer-screen-queries

  expect(productName).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(price).toBeInTheDocument();
  expect(category).toBeInTheDocument();
});
