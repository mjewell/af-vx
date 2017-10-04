import { AxisBottom, AxisLeft } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import React, { Component } from 'react';

export default class GraphArea extends Component {
  render() {
    const {
      width,
      height,
      margin,
      xMax,
      yMax,
      xScale,
      yScale,
      xAxisLabel,
      yAxisLabel,
      xAxisFormat,
      yAxisFormat
    } = this.props;

    return (
      <Group>
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
      </Group>
    );
  }
}
