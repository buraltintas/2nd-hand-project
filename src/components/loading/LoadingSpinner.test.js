import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('renders loading spinner', () => {
  const view = render(<LoadingSpinner />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const spinner = view.getByTestId('loading');
  expect(spinner).toBeInTheDocument();
});
