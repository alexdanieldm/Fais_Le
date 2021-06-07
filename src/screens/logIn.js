import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const logIn = ({ navigation }) => {
	const [ user, setUser ] = useState('');
	const [ password, setPassword ] = useState('');

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.header}>Sign In to Continue</Text>

				<Text style={styles.label}>Email</Text>

				<TextInput
					style={styles.input}
					placeholder="example@mail.com"
					onChangeText={(user) => setUser(user)}
					defaultValue={user}
					blurOnSubmit={false}
				/>

				<Text style={styles.label}>Password</Text>

				<TextInput
					style={styles.input}
					placeholder="Enter password"
					onChangeText={(password) => setPassword(password)}
					defaultValue={password}
					blurOnSubmit={false}
				/>

				<Button
					title="Log in"
					onPress={() => navigation.navigate('Todo')}
					color="#0096bd"
					accessibilityLabel="Access existing Account"
				/>

				<Text style={styles.separator}>or</Text>

				<Button
					title="Sign Up"
					onPress={() => navigation.navigate('SignUp')}
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
