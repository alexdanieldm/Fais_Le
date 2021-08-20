import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { firebase } from './src/firebase/config';

import Todo from './src/screens/todo';
import LogIn from './src/screens/logIn';
import SignUp from './src/screens/signUp';
import UserMenu from './src/screens/userMenu';

import Loading from './src/components/loading';
import ToggleMenu from './src/components/toggleMenu';

import FaisLeIcon from './src/assets/svgs/fais-le-icon';

const RootStack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        const usersCollection = firebase.firestore().collection('users');
        usersCollection
          .doc(authUser.uid)
          .get()
          .then(() => {
            setUser(authUser);
            setLoading(false);
          })
          .catch((error) => {
            firebase.auth().signOut();

            setLoading(false);
            alert(error.message);
          });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <Loading loading={loading} />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: <FaisLeIcon width={35} height={35} />,
          headerTitleAlign: user ? 'left' : 'center',
          headerStyle: {
            backgroundColor: '#0096bd',
          },
          headerTintColor: '#ffffff',
        }}
      >
        {user ? (
          <>
            <RootStack.Screen
              name="Todo"
              options={({ navigation }) => ({
                headerRight: () => <ToggleMenu onPress={() => navigation.navigate('Menu')} />,
              })}
            >
              {(props) => <Todo {...props} user={user} />}
            </RootStack.Screen>

            <RootStack.Screen
              name="Menu"
              component={UserMenu}
              options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitle: 'Close',
                headerTransparent: true,
                cardShadowEnabled: false,
              }}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="LogIn" component={LogIn} />
            <RootStack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
