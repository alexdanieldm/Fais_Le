import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Footer = () => {
  const {filter} = props;

  return (
      <View style={styles.container}>
        <Text>{props.count} count</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter === 'ALL' && styles.selected]}
            onPress={() => props.onFilter('ALL')}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'ACTIVE' && styles.selected]}
            onPress={() => props.onFilter('ACTIVE')}
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'COMPLETED' && styles.selected]}
            onPress={() => props.onFilter('COMPLETED')}
          >
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={props.onClearComplete}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filters: {
    flexDirection: 'row',
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: 'rgba(175, 47, 47, .2)',
  },
});

export default Footer;
