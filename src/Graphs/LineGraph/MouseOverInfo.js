import { Group } from '@vx/group';
import React, { Component } from 'react';

import Dots from './Dots';
import MouseTracker from './MouseTracker';
import Tooltip from './Tooltip';

export default class MouseOverInfo extends Component {
  state = { x: null, y: null };

  setCoords = ({ x, y }) => {
    this.setState({ x, y });
  };

  render() {
    const {
      data,
      width,
      height,
      xScale,
      yScale,
      xAccessor,
      yAccessor
    } = this.props;

    const { x } = this.state;

    return (
      <Group>
        <Dots
          data={data}
          x={x}
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
        <Tooltip
          data={data}
          x={x}
          xScale={xScale}
          yScale={yScale}
          xAccessor={xAccessor}
          yAccessor={yAccessor}
        />
        <MouseTracker
          width={width}
          height={height}
          onMouseMove={this.setCoords}
        />
      </Group>
    );
  }
}
