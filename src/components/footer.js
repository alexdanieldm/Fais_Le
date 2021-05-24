import React from 'react';

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const Footer = ( { author } ) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.content}>Made by {author} &copy; {new Date().getFullYear()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(0, 51, 77)',
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    color: 'white',
    fontSize: 10,
  },
});

export default Footer;
