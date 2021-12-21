import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {Rect} from '@shopify/react-native-skia';

export const Size = 20;
export const Padding = 10;

export const AnimationElement = ({x, y, w, h, color = '#7FC8A9'}) => {
  return (
    <Rect
      x={x}
      y={y ? y : ctx => ctx.height / 2 - Size / 2}
      height={w ?? Size}
      width={h ?? Size}
      color={color}
    />
  );
};

export const AnimationDemo = ({title, children}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: Padding / 2,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
