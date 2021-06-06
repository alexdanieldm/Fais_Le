import React from 'react';
import { View, StyleSheet } from 'react-native';

import Todo from './screens/todo';
import LogIn from './screens/logIn';
import SignUp from './screens/signUp';

const App = () => {
	return (
		<View style={styles.container}>
			<Todo />
			{/* <SignUp /> */}
			{/* <LogIn /> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
		...Platform.select({
			ios: { paddingTop: 30 }
		})
	}
});

export default App;
