import { curveLinear } from '@vx/curve';
import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import React from 'react';

export default function Lines({ data, xScale, yScale, xAccessor, yAccessor }) {
  return (
    <Group>
      {data.map(({ name, data, color }) => (
        <LinePath
          key={name}
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={xAccessor}
          y={yAccessor}
          strokeWidth={2}
          stroke={color}
          curve={curveLinear}
          glyph={(d, i) => {
            return (
              <g key={`line-point-${i}`}>
                <GlyphDot
                  cx={xScale(xAccessor(d))}
                  cy={yScale(yAccessor(d))}
                  r={5}
                  fill={color}
                />
              </g>
            );
          }}
        />
      ))}
    </Group>
  );
}
