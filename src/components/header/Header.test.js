import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Header from './index';

test('renders header', () => {
  const view = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <Header />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = view.getByTestId('header');
  expect(title).toBeInTheDocument();
});
