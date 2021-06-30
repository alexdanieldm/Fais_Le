import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from './src/firebase/config';

import Todo from './src/screens/todo';
import LogIn from './src/screens/logIn';
import SignUp from './src/screens/signUp';

import Loading from './src/components/loading';
import LogOutButton from './src/components/logOutButton';

const Stack = createStackNavigator();

const App = () => {
	const [ loading, setLoading ] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		setLoading(true);
		
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				const usersCollection = firebase.firestore().collection('users');
				usersCollection
					.doc(user.uid)
					.get()
					.then(() => {
						setUser(user)
						setLoading(false)
					})
					.catch((error) => {
						firebase.auth().signOut()
						console.error(error)
						alert(
							'Your device does not have a healthy Internet connection. Try again later'
						)
						setLoading(false)
					})
			}
			else {
				setUser(null)
				setLoading(false);
			}
		});
	}, []);

	const onSignOut = () => {
		firebase.auth().signOut().catch((error) => {
			console.error(error)
			alert(error.message);
		});
	};

	if (loading) {
		return <Loading loading={loading} />;
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
				{user ? (		
					<Stack.Screen name="Todo"
						options={{
							headerRight: () => (
								<LogOutButton onPress={onSignOut} />
							),
						}}
					>
						{props => <Todo {...props} user={user} />}
					</Stack.Screen>									
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
