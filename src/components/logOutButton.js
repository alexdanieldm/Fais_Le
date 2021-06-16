import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const LogOutButton = ({ onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.label}>Sign Out {String.fromCharCode(10006)}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	label: {
		fontSize: 14,
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: 'white'
	},

	button: {
		padding: 7,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'white',
		marginRight: 10
	}
});

export default LogOutButton;
