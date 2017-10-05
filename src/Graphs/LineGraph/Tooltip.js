import { Tooltip } from '@vx/tooltip';
import { entries, mean } from 'lodash';
import moment from 'moment';
import React from 'react';

import calculateClosestPoint from './calculateClosestPoint';

export default function MyTooltip({
  data,
  x,
  margin,
  xOffset,
  yOffset,
  xScale,
  yScale,
  xAccessor,
  yAccessor
}) {
  if (!x) {
    return null;
  }

  const values = entries(data).map(([name, { data, color }]) => ({
    point: calculateClosestPoint({
      data,
      value: xScale.invert(x),
      accessor: xAccessor
    }),
    color
  }));

  const y = yScale(mean(values.map(d => yAccessor(d.point))));

  return (
    <Tooltip
      top={y + margin.top + yOffset}
      left={x + margin.left + xOffset}
      style={{
        backgroundColor: '#222',
        color: '#FFF'
      }}
    >
      <div style={{ fontWeight: 700 }}>
        {moment(xScale.invert(x)).format('MMM YYYY')}
      </div>
      <div>
        {values.map(v => (
          <div key={v.color} style={{ marginTop: 5 }}>
            <span
              style={{
                width: 12,
                height: 12,
                backgroundColor: v.color,
                display: 'inline-block',
                marginRight: 4
              }}
            />
            {yAccessor(v.point)}
          </div>
        ))}
      </div>
    </Tooltip>
  );
}
