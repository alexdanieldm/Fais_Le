import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const logIn = () => {
	const [ user, setUser ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<View style={styles.container}>
			<Text style={styles.banner}>務</Text>

			<View style={styles.content}>
				<Text style={styles.header}>Sign In to Continue</Text>

				<Text style={styles.label}>Email</Text>

				<TextInput
					style={styles.input}
					value={user}
					onChange={(value) => setUser(value)}
					placeholder="example@mail.com"
					returnKeyType="done"
					blurOnSubmit={false}
				/>

				<Text style={styles.label}>Password</Text>

				<TextInput
					style={styles.input}
					value={password}
					onChange={(value) => setPassword(value)}
					placeholder="Enter password"
					blurOnSubmit={false}
					returnKeyType="done"
				/>

				<Button
					onPress={console.log(user)}
					title="Log in"
					color="#0096bd"
					accessibilityLabel="Create a new Account"
				/>

				<Text style={styles.separator}>or</Text>

				<Button
					style={styles}
					onPress={console.log(user)}
					title="Sign Up"
					color="#969696"
					accessibilityLabel="Create a new Account"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},

	banner: {
		fontSize: 35,
		backgroundColor: '#0096bd',
		fontWeight: 'bold',
		color: 'white',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	header: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingBottom: 25
	},

	content: {
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 20,
		margin: 16
	},

	label: {
		paddingLeft: 5,
		paddingBottom: 5,
		fontSize: 14
	},

	input: {
		borderColor: '#dddddd',
		borderWidth: 1,
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 12,
		marginBottom: 20
	},

	separator: {
		marginVertical: 10,
		fontSize: 13,
		alignSelf: 'center',
		fontStyle: 'italic'
	}
});

export default logIn;
