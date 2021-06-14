import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from './firebase/config';

import Todo from './screens/todo';
import LogIn from './screens/logIn';
import SignUp from './screens/signUp';
import Loading from './components/loading';

const Stack = createStackNavigator();

const App = () => {
	const [ loading, setLoading ] = useState(false);
	const [ loggedIn, setLoggedIn ] = useState(false);

	useEffect(() => {
		setLoading(true);
		console.log('mounted');
		const usersRef = firebase.firestore().collection('users');
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				setLoggedIn(true);
				console.log('SIGN IN: ' + loggedIn);
			}
			else {
				setLoggedIn('LogIn');
				console.log('SIGN OUT: ' + loggedIn);
				setLoading(false);
			}
		});
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={loggedIn ? 'Todo' : 'LogIn'}
				screenOptions={{
					headerShown: true,
					title: '務',
					headerStyle: {
						backgroundColor: '#0096bd'
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 36
					}
				}}
			>
				<Stack.Screen name="Todo" component={Todo} />
				<Stack.Screen name="LogIn" component={LogIn} />
				<Stack.Screen name="SignUp" component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
