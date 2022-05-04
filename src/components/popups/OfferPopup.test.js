import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import OfferPopup from './OfferPopup';

test('renders offer popup', () => {
  const view = render(
    <BrowserRouter>
      <AuthContext.Provider value={{ isLoggedIn: true }}>
        <OfferPopup product={{ name: 'test' }} />
      </AuthContext.Provider>
    </BrowserRouter>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = view.getByTestId('offer-popup');
  expect(title).toBeInTheDocument();
});
