import {AnimationDemo, AnimationElement, Padding, Size} from './Components';
import {Canvas, Easing, useLoop} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

import React from 'react';
import {createTiming} from '@shopify/react-native-skia/src/animation/Animation/functions';

const {width} = Dimensions.get('window');

const InterpolationWithEasing = () => {
  const progress = useLoop(
    createTiming({
      from: 10,
      to: width - Size - Padding,
      duration: 1000,
      easing: Easing.inOut(Easing.cubic),
    }),
    {yoyo: true},
  );
  return (
    <AnimationDemo title={'Interpolating value using an easing.'}>
      <Canvas style={styles.canvas}>
        <AnimationElement x={() => progress.value} />
      </Canvas>
    </AnimationDemo>
  );
};

export default InterpolationWithEasing;

const styles = StyleSheet.create({
  canvas: {
    height: 80,
    width: width - Padding,
    backgroundColor: '#FEFEFE',
  },
});
