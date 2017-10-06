import { AxisBottom, AxisLeft } from '@vx/axis';
import { GridColumns, GridRows } from '@vx/grid';
import { Group } from '@vx/group';
import { LegendOrdinal } from '@vx/legend';
import { scaleLinear, scaleTime } from '@vx/scale';
import { scaleOrdinal } from '@vx/scale';
import { extent } from 'd3-array';
import React, { Component } from 'react';

import Dots from './Dots';
import Lines from './Lines';
import MouseTracker from './MouseTracker';
import Tooltip from './Tooltip';

export default class LineGraph extends Component {
  state = { x: null, y: null };

  setCoords = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    const {
      data,
      width,
      height,
      margin,
      xDomain,
      yDomain,
      xAccessor,
      yAccessor,
      xAxisLabel,
      yAxisLabel,
      xAxisFormat,
      yAxisFormat
    } = this.props;

    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    const allData = [].concat(...data.map(d => d.data));

    const xScale = scaleTime({
      range: [0, graphWidth],
      domain: xDomain || extent(allData, xAccessor)
    });
    const yScale = scaleLinear({
      range: [graphHeight, 0],
      domain: yDomain || extent(allData, yAccessor)
    });

    const legendScale = scaleOrdinal({
      domain: data.map(d => d.name),
      range: data.map(d => d.color)
    });

    return (
      <div
        style={{
          position: 'relative',
          backgroundColor: '#F6F6F6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: width,
          padding: 10
        }}
      >
        <LegendOrdinal
          direction="row"
          itemDirection="row"
          shape="rect"
          scale={legendScale}
          itemMargin="0 5px"
        />
        <svg width={width} height={height}>
          <Group top={margin.top} left={margin.left}>
            <GridRows scale={yScale} width={width} stroke="#e9e9e9" />
            <GridColumns scale={xScale} height={width} stroke="#e9e9e9" />
            <AxisLeft
              scale={yScale}
              label={yAxisLabel}
              tickFormat={yAxisFormat}
            />
            <AxisBottom
              top={graphHeight}
              scale={xScale}
              label={xAxisLabel}
              tickFormat={xAxisFormat}
            />
            <Lines
              data={data}
              xScale={xScale}
              yScale={yScale}
              xAccessor={xAccessor}
              yAccessor={yAccessor}
            />
            <Dots
              x={this.state.x}
              data={data}
              xScale={xScale}
              yScale={yScale}
              xAccessor={xAccessor}
              yAccessor={yAccessor}
            />
            <MouseTracker
              width={graphWidth}
              height={graphHeight}
              onMouseMove={this.setCoords}
            />
          </Group>
        </svg>
        <Tooltip
          data={data}
          x={this.state.x}
          margin={margin}
          xOffset={10}
          yOffset={-40}
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
      </div>
    );
  }
}
