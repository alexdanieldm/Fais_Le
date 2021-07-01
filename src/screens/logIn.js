import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard } from 'react-native';

import { firebase } from '../firebase/config';

import Loading from '../components/loading';

const logIn = ({ navigation }) => {
	const [ loading, setLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const onLogIn = () => {
		Keyboard.dismiss();
		setLoading(true);

		firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
			setLoading(false);

			setEmail('');
			setPassword('');

			alert(error.message);
		});
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.header}>Sign In to Continue</Text>

				<Text style={styles.label}>Email</Text>

				<TextInput
					style={styles.input}
					placeholder="example@mail.com"
					onChangeText={(email) => setEmail(email)}
					defaultValue={email}
					blurOnSubmit={false}
					keyboardType="email-address"
				/>

				<Text style={styles.label}>Password</Text>

				<TextInput
					style={styles.input}
					placeholder="Enter password"
					onChangeText={(password) => setPassword(password)}
					defaultValue={password}
					blurOnSubmit={false}
					secureTextEntry={true}
				/>

				<Button title="Log In" onPress={onLogIn} color="#0096bd" accessibilityLabel="Access existing Account" />

				<Text style={styles.signUp}>
					Don't have an account?
					<Text style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
						{' '}
						Sign up
					</Text>
				</Text>
			</View>
			<Loading loading={loading} />
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

	signUp: {
		marginTop: 18,
		fontSize: 13,
		alignSelf: 'center'
	},

	signUpLink: {
		color: '#0096bd',
		fontWeight: 'bold'
	}
});

export default logIn;
