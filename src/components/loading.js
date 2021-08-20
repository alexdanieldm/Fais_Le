import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const Loading = ({ loading }) => {
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating={true} size="large" color="#0096bd" />
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.2)',
  },
});

export default Loading;
