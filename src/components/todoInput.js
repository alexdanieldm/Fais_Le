import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Check from '../assets/svgs/check';

const Header = (props) => (
  <View style={styles.header}>
    <TouchableOpacity
      accessibilityLabel="complete-all-button"
      onPress={props.onToggleAllComplete}
    >
      <Check width={25} height={25} fill={'#CCC'} />
    </TouchableOpacity>

    <TextInput
      value={props.value}
      onChangeText={props.onChange}
      onSubmitEditing={props.onAddItem}
      placeholder="What needs to be done?"
      blurOnSubmit={false}
      returnKeyType="done"
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 30,
    color: '#CCC',
  },
  input: {
    flex: 1,
    marginLeft: 16,
    height: 50,
  },
});

export default Header;
