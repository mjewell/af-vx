import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import React, { Component } from 'react';

import calculateClosestPoint from './calculateClosestPoint';
import MouseTracker from './MouseTracker';

export default class Dots extends Component {
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
        {x &&
          data.map(({ name, data }) => {
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
        <MouseTracker
          width={width}
          height={height}
          onMouseMove={this.setCoords}
        />
      </Group>
    );
  }
}
