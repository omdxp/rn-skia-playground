import {Canvas, Circle, Group} from '@shopify/react-native-skia';
import {Text, View} from 'react-native';

import React from 'react';

export const HelloWorld = () => {
  const width = 256;
  const height = 256;
  const r = 215;
  return (
    <Canvas style={{flex: 1}}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={width - r} cy={r} r={r} color="magenta" />
        <Circle cx={width / 2} cy={height - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};

const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <HelloWorld />
    </View>
  );
};

export default App;
