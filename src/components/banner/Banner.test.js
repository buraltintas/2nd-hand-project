import React from 'react';
import { render } from '@testing-library/react';
import Banner from './index';

test('renders banner', () => {
  const view = render(<Banner />);

  // eslint-disable-next-line testing-library/prefer-screen-queries
  const title = view.getByTestId('banner');
  expect(title).toBeInTheDocument();
});
