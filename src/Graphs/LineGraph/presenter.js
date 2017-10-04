import { AxisBottom, AxisLeft } from '@vx/axis';
import { curveMonotoneX } from '@vx/curve';
import { GlyphDot } from '@vx/glyph';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { extent } from 'd3-array';
import React, { Component } from 'react';

import Tooltip from '../WithTooltip/Tooltip';

export default class LineGraph extends Component {
  state = { dummy: false };

  render() {
    const {
      data,
      width,
      height,
      margin,
      xDomain,
      yDomain,
      xAxisLabel,
      yAxisLabel,
      xAxisFormat,
      yAxisFormat,
      xAccessor,
      yAccessor
    } = this.props;

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const xScale = scaleTime({
      range: [0, xMax],
      domain: xDomain || extent(data, xAccessor)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: yDomain || extent(data, yAccessor)
    });

    return (
      <svg
        ref={s => {
          this.svg = s;
          if (!this.state.dummy) {
            this.setState({ dummy: true });
          }
        }}
        width={width}
        height={height}
        fill="#F6F6F6"
      >
        <rect width={width} height={height} fill="#F6F6F6" />
        <GridRows
          scale={yScale}
          left={margin.left}
          top={margin.top}
          width={xMax}
          stroke="#e9e9e9"
        />
        <GridColumns
          scale={xScale}
          left={margin.left}
          top={margin.top}
          height={yMax}
          stroke="#e9e9e9"
        />
        <Group top={margin.top} left={margin.left}>
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={xAccessor}
            y={yAccessor}
            strokeWidth={2}
            stroke="#000"
            curve={curveMonotoneX}
            glyph={(d, i) => {
              return (
                <g key={`line-point-${i}`}>
                  <GlyphDot
                    cx={xScale(xAccessor(d))}
                    cy={yScale(yAccessor(d))}
                    r={5}
                    fill="#000"
                  />
                </g>
              );
            }}
          />
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={yScale}
          label={yAxisLabel}
          tickFormat={yAxisFormat}
        />
        <AxisBottom
          top={height - margin.bottom}
          left={margin.left}
          scale={xScale}
          label={xAxisLabel}
          tickFormat={xAxisFormat}
        />
        <Tooltip
          {...this.props}
          xMax={xMax}
          yMax={yMax}
          xScale={xScale}
          yScale={yScale}
          svg={this.svg}
        />
      </svg>
    );
  }
}
