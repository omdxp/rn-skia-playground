import {AnimationDemo, AnimationElement, Padding, Size} from './Components';
import {
  Canvas,
  Spring,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import {Dimensions, StyleSheet} from 'react-native';

import React from 'react';
import {runSpring} from '@shopify/react-native-skia/src/animation/Animation/functions';

const {width} = Dimensions.get('window');

const AnimationWithTouchHandler = () => {
  const translateX = useValue((width - Size - Padding) / 2);
  const offsetX = useValue(0);
  const touchHandler = useTouchHandler({
    onStart: ({x}) => (offsetX.value = x - translateX.value),
    onActive: ({x}) => (translateX.value = x - offsetX.value),
    onEnd: ({velocityX}) => {
      runSpring(
        translateX,
        (width - Size - Padding) / 2,
        Spring.Wobbly({velocity: velocityX}),
      );
    },
  });

  return (
    <AnimationDemo title={'Animation with touch handler.'}>
      <Canvas style={styles.canvas} onTouch={touchHandler}>
        <AnimationElement x={() => translateX.value} />
      </Canvas>
    </AnimationDemo>
  );
};

export default AnimationWithTouchHandler;

const styles = StyleSheet.create({
  canvas: {
    height: 80,
    width: width - Padding,
    backgroundColor: '#FEFEFE',
  },
});
