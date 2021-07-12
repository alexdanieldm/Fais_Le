/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import Menu from '../src/screens/userMenu';
import onSignOut from '../src/utils/onSignOut';

describe('Screen', () => {
	test('Should render correctly', () => {
		const menuJSON = renderer.create(<Menu />).toJSON();
		expect(menuJSON).toMatchSnapshot();
	});
});

describe('Go Home Button', () => {
	test('Should navigate to ToDo screen', async () => {
		const goBack = jest.fn();
		const { findByText } = render(<Menu navigation={{ goBack }} />);
		const GoHomeButton = await findByText('Go Home');

		fireEvent(GoHomeButton, 'press');
		expect(goBack).toHaveBeenCalled();
	});
});
