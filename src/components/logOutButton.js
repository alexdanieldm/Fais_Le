import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import UserCircle from '../assets/svgs/user-circle';

const LogOutButton = ({ onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<UserCircle width={30} height={30} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	button: {
		marginRight: 18
	}
});

export default LogOutButton;
