import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import { entries } from 'lodash';
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
      {entries(data).map(([name, { data, color }]) => {
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
