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

// ! DELETE AFTER DEBUGGING SESSION
import timed_log from './utils/timedLog';
// ! DELETE AFTER DEBUGGING SESSION

const Stack = createStackNavigator();

const App = () => {
	const [ loading, setLoading ] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		setLoading(true);
		const usersCollection = firebase.firestore().collection('users');

		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				timed_log(`Start Login...`);
				usersCollection
					.doc(user.uid)
					.get()
					.then((document) => {
						timed_log(`Logged as: ${user.email} -- ${user.uid} --`);
						const userData = document.data()
						setLoading(false)
						setUser(userData)
					})
					.catch((error) => {
						console.error(error)
						alert(error.message)
						setLoading(false)
					})
			}
			else {
				timed_log('No User Found');
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
