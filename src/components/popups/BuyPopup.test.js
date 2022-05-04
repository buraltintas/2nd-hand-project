import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import BuyPopup from './BuyPopup';

test('renders buy popup', () => {
  const view = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <BuyPopup />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = view.getByTestId('buy-popup');
  expect(title).toBeInTheDocument();
});
