import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import {
  PaintStyle,
  Skia,
  SkiaView,
  useDrawCallback,
  useImage,
} from '@shopify/react-native-skia';

import React from 'react';
import {Title} from './Title';

const card = require('./oslo.jpg');

const {width} = Dimensions.get('window');
const SIZE = width;
const center = {x: SIZE / 2, y: SIZE / 2};
const aspectRatio = 836 / 1324;
const CARD_WIDTH = width - 64;
const CARD_HEIHT = CARD_WIDTH * aspectRatio;

const paint = Skia.Paint();
paint.setAntiAlias(true);
paint.setColor(Skia.Color('#61DAFB'));

const strokePaint = paint.copy();
strokePaint.setStyle(PaintStyle.Stroke);
strokePaint.setStrokeWidth(2);

// TODO: use examples from https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
// Once the Path API is available.
const Transform = () => {
  const image = useImage(card);

  const onRotateDraw = useDrawCallback(canvas => {
    const rect = Skia.XYWHRect(
      center.x - CARD_WIDTH / 2,
      center.y - CARD_HEIHT / 2,
      CARD_WIDTH,
      CARD_HEIHT,
    );
    if (image) {
      const imgRect = Skia.XYWHRect(0, 0, image.width(), image.height());
      canvas.save();
      canvas.rotate(-30, center.x, center.y);

      //  we pivot on the center of the card
      canvas.translate(center.x, center.y);
      canvas.scale(0.75, 0.75);
      canvas.translate(-center.x, -center.y);

      canvas.drawImageRect(image, imgRect, rect, paint);
      canvas.restore();
    }
  }, []);

  const onSkewDraw = useDrawCallback(canvas => {
    const rect = Skia.XYWHRect(
      center.x - CARD_WIDTH / 2,
      center.y - CARD_HEIHT / 2,
      CARD_WIDTH,
      CARD_HEIHT,
    );
    if (image) {
      const imgRect = Skia.XYWHRect(0, 0, image.width(), image.height());
      canvas.save();

      //  we pivot on the center of the card
      canvas.translate(center.x, center.y);
      canvas.skew(-Math.PI / 6, 0);
      canvas.translate(-center.x, -center.y);

      canvas.drawImageRect(image, imgRect, rect, paint);
      canvas.restore();
    }
  }, []);

  const onMatrixDraw = useDrawCallback(canvas => {
    const rect = Skia.XYWHRect(
      center.x - CARD_WIDTH / 2,
      center.y - CARD_HEIHT / 2,
      CARD_WIDTH,
      CARD_HEIHT,
    );
    if (image) {
      const imgRect = Skia.XYWHRect(0, 0, image.width(), image.height());
      canvas.save();

      //  we pivot on the center of the card
      canvas.translate(center.x, center.y);
      canvas.skew(-Math.PI / 6, 0);
      canvas.translate(-center.x, -center.y);

      canvas.drawImageRect(image, imgRect, rect, paint);
      canvas.restore();
    }
  }, []);

  return (
    <ScrollView>
      <Title>Rotate & Scale</Title>
      <SkiaView style={styles.container} onDraw={onRotateDraw} />
      <Title>Skew</Title>
      <SkiaView style={styles.container} onDraw={onSkewDraw} />
      <Title>Matrix</Title>
      <SkiaView style={styles.container} onDraw={onMatrixDraw} />
    </ScrollView>
  );
};

export default Transform;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
});
