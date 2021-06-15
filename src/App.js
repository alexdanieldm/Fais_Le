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
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
			}
			else {
				setIsLoggedIn(false);
			}
			setLoading(false)
		})
		// const usersCollection = firebase.firestore().collection('users');
	}, []);

	if (loading) {
		return <Loading loading={loading} />
	}

	return (
		<NavigationContainer>
			<Stack.Navigator
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
				{isLoggedIn ? (
					<>
						<Stack.Screen name="Todo" component={Todo} />
					</>

        		) : (
					<>
						<Stack.Screen name="LogIn" component={LogIn} />
						<Stack.Screen name="SignUp" component={SignUp} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);

};

export default App;
