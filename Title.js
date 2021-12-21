import {StyleSheet, Text} from 'react-native';

import React from 'react';

export const Title = ({children}) => {
  return <Text style={styles.title}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
});
