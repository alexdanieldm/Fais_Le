/**
 * @format
 */

import 'react-native';
import React from 'react';
import Menu from '../src/screens/userMenu';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('Renders correctly', () => {
	const tree = renderer.create(<Menu />).toJSON();
	expect(tree).toMatchSnapshot();
});
