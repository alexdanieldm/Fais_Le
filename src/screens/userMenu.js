import React from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';

import onSignOut from '../utils/onSignOut';

import Out from '../assets/svgs/out';
import Home from '../assets/svgs/home';
import FaisLeIcon from '../assets/svgs/fais-le-icon';

const UserMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FaisLeIcon width={35} height={35} />
        <Text style={styles.header}>Menu</Text>

        <View style={styles.buttonsSection}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Home width={40} height={40} fill={'#0096bd'} />
            <Text style={styles.label}>Go Home</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => onSignOut()}>
            <Out width={40} height={40} fill={'#0096bd'} />
            <Text style={styles.label}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0096bd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    width: '60%',
    paddingVertical: 25,
    alignItems: 'center',
  },

  header: {
    marginTop: 10,
    marginBottom: 30,

    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },

  quote: {
    marginBottom: 25,

    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },

  buttonsSection: {
    marginBottom: 20,

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },

  label: {
    marginTop: 5,

    fontStyle: 'italic',
    fontWeight: 'bold',
    // color: 'white',
    color: '#0096bd',
    fontSize: 13,
  },

  button: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: 20,

    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // borderWidth: 2,
    borderColor: 'white',

    backgroundColor: 'white',
  },
});

export default UserMenu;
