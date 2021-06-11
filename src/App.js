import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Todo from './screens/todo';
import LogIn from './screens/logIn';
import SignUp from './screens/signUp';

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="LogIn"
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
				<Stack.Screen name="LogIn" component={LogIn} />
				<Stack.Screen name="SignUp" component={SignUp} />
				<Stack.Screen name="Todo" component={Todo} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
