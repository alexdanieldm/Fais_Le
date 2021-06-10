import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, LogBox } from 'react-native';

import { firebase } from '../firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../components/loading';

const logIn = ({ navigation }) => {
	const [ loading, setLoading ] = useState(false);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ fullName, setFullName ] = useState('');

	// ! DEBUG: START
	// useEffect(
	// 	() => {
	// 		console.log('States Values');
	// 		console.log(fullName);
	// 		console.log(email);
	// 		console.log(password);
	// 	},
	// 	[ email, fullName, password ]
	// );
	// ! DEBUG: END

	const onSignUp = () => {
		setLoading(true);
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				const uid = response.user.uid;
				const data = {
					id: uid,
					email,
					fullName
				};
				console.log('USER REGISTERED');

				const usersRef = firebase.firestore().collection('users');
				usersRef
					.doc(uid)
					.set(data)
					.then(() => {
						console.log('DATA REGISTERED');
						navigation.navigate('LogIn');
						console.log('NAVIGATION FAIL');
					})
					.catch((error) => {
						alert(error);
						console.error(error);
					});
			})
			.catch((error) => {
				alert(error);
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
				console.log('Loading - FALSE');
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

	separator: {
		marginVertical: 10,
		fontSize: 13,
		alignSelf: 'center',
		fontStyle: 'italic'
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
