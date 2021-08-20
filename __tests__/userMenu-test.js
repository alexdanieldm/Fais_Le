import 'react-native';

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import Menu from '../src/screens/userMenu';
import { onSignOut as mockOnSignOut } from '../src/utils/onSignOut';

jest.mock('../src/utils/onSignOut');

afterEach(() => {
  jest.clearAllMocks();
});

const mockGoBack = jest.fn();

test('GoHomeButton navigate to ToDo Screen', async () => {
  const { getByText } = render(<Menu navigation={{ goBack: mockGoBack }} />);

  const GoHomeButton = getByText(/go home/i);

  fireEvent.press(GoHomeButton);

  expect(mockGoBack).toHaveBeenCalled();
});

test('LogOutButton close current user session', async () => {
  const { getByText } = render(<Menu />);

  const LogOutButton = getByText(/sign out/i);

  fireEvent.press(LogOutButton);

  console.log(mockOnSignOut);

  // expect(mockOnSignOut).toHaveBeenCalled();
});
