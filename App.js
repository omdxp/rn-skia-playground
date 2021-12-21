import {Button, StyleSheet, View} from 'react-native';
import {
  PaintStyle,
  Skia,
  SkiaView,
  StrokeCap,
  useDrawCallback,
  usePaint,
  useTouchHandler,
} from '@shopify/react-native-skia';
import React, {useMemo, useRef} from 'react';

const DrawingExample = () => {
  const paint = usePaint(p => p.setColor(Skia.Color('#7FC8A9')));
  const prevPointRef = useRef();

  const pathPaint = usePaint(p => {
    p.setColor(Skia.Color('#7F33A9'));
    p.setStrokeWidth(5);
    p.setStyle(PaintStyle.Stroke);
    p.setStrokeCap(StrokeCap.Round);
  });

  const paths = useMemo(() => [], []);

  const touchHandler = useTouchHandler({
    onStart: ({x, y}) => {
      const path = Skia.Path.Make();
      paths.push(path);
      path.moveTo(x, y);
      prevPointRef.current = {x, y};
    },
    onActive: ({x, y}) => {
      // Get current path object
      const path = paths[paths.length - 1];

      // Calculate and draw a smooth curve
      const xMid = (prevPointRef.current.x + x) / 2;
      const yMid = (prevPointRef.current.y + y) / 2;

      path.quadTo(prevPointRef.current.x, prevPointRef.current.y, xMid, yMid);

      prevPointRef.current = {x, y};
    },
  });

  const onDraw = useDrawCallback(
    (canvas, info) => {
      // Update from pending touches
      touchHandler(info.touches);

      // Clear screen
      canvas.drawPaint(paint);

      // Draw paths
      if (paths.length > 0) {
        for (let i = 0; i < paths.length; i++) {
          canvas.drawPath(paths[i], pathPaint);
        }
      }
    },
    [paint, pathPaint, paths],
  );

  const skiaViewRef = useRef(null);

  return (
    <>
      <SkiaView
        ref={skiaViewRef}
        style={styles.skiaview}
        onDraw={onDraw}
        debug
      />
      <View style={styles.buttons}>
        <Button
          title="Clear"
          onPress={() => {
            paths.length = 0;
            skiaViewRef.current?.redraw();
          }}
        />
        <Button
          title="Undo"
          onPress={() => {
            paths.length = Math.max(0, paths.length - 1);
            skiaViewRef.current?.redraw();
          }}
        />
      </View>
    </>
  );
};

export default DrawingExample;

const styles = StyleSheet.create({
  skiaview: {
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  buttons: {
    flexDirection: 'row',
    paddingBottom: 24,
    paddingHorizontal: 14,
  },
});
