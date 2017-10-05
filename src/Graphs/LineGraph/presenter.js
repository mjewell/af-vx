import { scaleLinear, scaleTime } from '@vx/scale';
import { extent } from 'd3-array';
import React, { Component } from 'react';

import Dots from './Dots';
import GraphArea from './GraphArea';
import Lines from './Lines';
import MouseTracker from './MouseTracker';

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
      yAccessor
    } = this.props;

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const allData = Object.values(data).reduce((arr, curr) => [
      ...arr,
      ...curr.data
    ]);

    const xScale = scaleTime({
      range: [0, xMax],
      domain: xDomain || extent(allData, xAccessor)
    });
    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: yDomain || extent(allData, yAccessor)
    });

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height} fill="#F6F6F6">
          <GraphArea
            {...this.props}
            xMax={xMax}
            yMax={yMax}
            xScale={xScale}
            yScale={yScale}
          >
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
              width={xMax}
              height={yMax}
              onMouseMove={this.setCoords}
            />
          </GraphArea>
        </svg>
      </div>
    );
  }
}
