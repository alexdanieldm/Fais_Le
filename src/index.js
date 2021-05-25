import React from 'react';

import ToDo from './components/todo';
import Footer from './components/footer';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  useColorScheme,
  StatusBar, 
} from 'react-native';

const App = () => {
  
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={ styles.container }>
      <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } />
      
      <View style={styles.banner}>
        <Text style={{ fontSize: 45, color: 'white', fontWeight: 'bold', }}>為</Text>
      </View>
      
      <ToDo />
      
      <Footer author='Alex Duran'/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(240,240,240)',
  },

  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 5,
    
    backgroundColor: 'rgb(32, 35, 42)',
  },
});

export default App;
