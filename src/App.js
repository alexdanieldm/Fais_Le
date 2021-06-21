import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from './firebase/config';

import Todo from './screens/todo';
import LogIn from './screens/logIn';
import SignUp from './screens/signUp';

import Loading from './components/loading';
import LogOutButton from './components/logOutButton';

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
					.then((document) => {
						const userData = document.data()
						setUser(userData)
						setLoading(false)
					})
					.catch((error) => {
						console.error(error)
						setLoading(false)
						alert(
							'Your device does not have a healthy Internet connection. Try again later'
						)
					})
			}
			else {
				setLoading(false);
			}
		});
	}, []);

	const onSignOut = () => {
		firebase.auth().signOut().catch((error) => {
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
