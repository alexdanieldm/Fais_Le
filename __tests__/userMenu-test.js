import 'react-native';

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Menu from '../src/screens/userMenu';
import mockOnSignOut from '../src/utils/onSignOut';

jest.mock('../src/utils/onSignOut');

afterEach(() => {
  jest.clearAllMocks();
});

test('GoHome button triggers navigation.goBack() prop method', async () => {
  const mockGoBack = jest.fn();
  const { getByText } = render(<Menu navigation={{ goBack: mockGoBack }} />);

  const GoHomeButton = getByText(/go home/i);

  fireEvent.press(GoHomeButton);

  expect(mockGoBack).toHaveBeenCalled();
});

test('LogOut button triggers onSignOut function', async () => {
  const { getByText } = render(<Menu />);

  const LogOutButton = getByText(/sign out/i);

  fireEvent.press(LogOutButton);

  expect(mockOnSignOut).toHaveBeenCalled();
});
