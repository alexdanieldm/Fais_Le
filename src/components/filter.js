import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = (props) => {
  const { filter } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Items: {props.count}</Text>

      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.filter, filter === 'ALL' && styles.selected]}
          onPress={() => props.onFilter('ALL')}
        >
          <Text style={styles.label}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filter, filter === 'ACTIVE' && styles.selected]}
          onPress={() => props.onFilter('ACTIVE')}
        >
          <Text style={styles.label}>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filter, filter === 'COMPLETED' && styles.selected]}
          onPress={() => props.onFilter('COMPLETED')}
        >
          <Text style={styles.label}>Completed</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.clear} onPress={props.onClearComplete}>
        <Text style={styles.label}>Clear Completed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0096bd',
  },

  count: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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

  label: {
    color: 'white',
  },

  clear: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },

  selected: {
    borderColor: 'white',
  },
});

export default Footer;
