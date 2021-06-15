import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const LogOutButton = ({ onPress }) => (
	<TouchableOpacity style={styles.button} onPress={onPress}>
		<Text style={styles.label}>Sign Out {String.fromCharCode(10006)}</Text>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	label: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: 'white'
	},

	button: {
		padding: 8,
		borderRadius: 5,
		borderWidth: 1.2,
		borderColor: 'white',
		marginRight: 10
	}
});

export default LogOutButton;
