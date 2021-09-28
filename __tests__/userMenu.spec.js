import 'react-native';

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Menu from '../src/screens/userMenu';
import mockOnSignOut from '../src/utils/onSignOut';

jest.mock('../src/utils/onSignOut');

afterEach(() => {
  jest.clearAllMocks();
});

test('button should call navigation.goBack() prop method', () => {
  const mockGoBack = jest.fn();

  // render the todo screen
  const { getByText } = render(<Menu navigation={{ goBack: mockGoBack }} />);

  fireEvent.press(getByText(/go home/i));

  expect(mockGoBack).toHaveBeenCalled();
});

test('button should call onSignOut function', () => {
  const { getByText } = render(<Menu />);

  fireEvent.press(getByText(/sign out/i));

  expect(mockOnSignOut).toHaveBeenCalled();
});
