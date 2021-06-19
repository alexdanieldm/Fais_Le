import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Keyboard } from 'react-native';

import { firebase } from '../firebase/config';

import Loading from '../components/loading';

// ! DELETE AFTER DEBUGGING SESSION
import timed_log from '../utils/timedLog';
// ! DELETE AFTER DEBUGGING SESSION

const logIn = ({ navigation }) => {
	const [ loading, setLoading ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ fullName, setFullName ] = useState('');

	const onSignUp = () => {
		Keyboard.dismiss();

		setLoading(true);
		const usersCollection = firebase.firestore().collection('users');

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				var user = userCredential.user;

				const data = {
					fullName,
					email,
					joined: new Date()
				};

				timed_log('Writing...');
				usersCollection
					.doc(user.uid)
					.set(data)
					.then((docRef) => {
						timed_log(`Document written with ID: ${data.id}`);
					})
					.catch((error) => {
						alert('Error creating your new Account. Please try again later');
						console.error(error);
					});
			})
			.catch((error) => {
				setLoading(false);

				setFullName('');
				setEmail('');
				setPassword('');

				alert(error.message);
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.header}>Create Account</Text>

				<Text style={styles.label}>Full Name</Text>

				<TextInput
					style={styles.input}
					placeholder="Alex Duran"
					onChangeText={(fullName) => setFullName(fullName)}
					defaultValue={fullName}
					blurOnSubmit={false}
					keyboardType="default"
				/>

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
					secureTextEntry={true}
				/>

				<Button
					title="Create account"
					onPress={onSignUp}
					color="#0096bd"
					accessibilityLabel="Create a new Account"
				/>

				<Text style={styles.signUp}>
					Already have an account?
					<Text style={styles.signUpLink} onPress={() => navigation.navigate('LogIn')}>
						{' '}
						Log In
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
