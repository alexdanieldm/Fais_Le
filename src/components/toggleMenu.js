import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import UserCircle from '../assets/svgs/user-circle';

const toggleMenu = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <UserCircle width={30} height={30} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    marginRight: 18,
  },
});

export default toggleMenu;
