import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import React from 'react';

import calculateClosestPoint from './calculateClosestPoint';

export default function Dots({
  data,
  x,
  xScale,
  yScale,
  xAccessor,
  yAccessor
}) {
  if (!x) {
    return null;
  }

  return (
    <Group>
      {data.map(({ name, data }) => {
        const closestPoint = calculateClosestPoint({
          data,
          value: xScale.invert(x),
          accessor: xAccessor
        });

        return (
          <GlyphDot
            key={name}
            cx={xScale(xAccessor(closestPoint))}
            cy={yScale(yAccessor(closestPoint))}
            r={4}
            fill="#FFF"
          />
        );
      })}
    </Group>
  );
}
