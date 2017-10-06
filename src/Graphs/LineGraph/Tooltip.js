import { Group } from '@vx/group';
import { mean } from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';

import calculateClosestPoint from './calculateClosestPoint';
import MouseTracker from './MouseTracker';

const tooltipPadding = 10;
const lineHeight = 20;
const lineSpacing = 4;

export default class MyTooltip extends Component {
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

    const values = data.map(({ name, data, color }) => ({
      point: calculateClosestPoint({
        data,
        value: xScale.invert(x),
        accessor: xAccessor
      }),
      color
    }));

    const y = yScale(mean(values.map(d => yAccessor(d.point))));

    const boundingBox = this.tooltip ? this.tooltip.getBBox() : {};

    return (
      <Group>
        <Group top={y + tooltipPadding - boundingBox.height / 2} left={x + 20}>
          {x && (
            <rect
              x={boundingBox.x - tooltipPadding}
              y={boundingBox.y - tooltipPadding}
              width={boundingBox.width + tooltipPadding * 2}
              height={boundingBox.height + tooltipPadding * 2}
              fill="#222"
            />
          )}
          <g ref={el => (this.tooltip = el)}>
            {x && (
              <text fill="#FFF" font-weight={700}>
                {moment(xScale.invert(x)).format('MMM YYYY')}
              </text>
            )}
            {x &&
              values.map((v, i) => (
                <Group top={(i + 1) * lineHeight}>
                  <rect
                    y={-lineHeight / 2 + lineSpacing / 2}
                    width={lineHeight - lineSpacing}
                    height={lineHeight - lineSpacing}
                    fill={v.color}
                  />
                  <text
                    x={lineHeight + 5}
                    fill="#FFF"
                    dominantBaseline="central"
                  >
                    {yAccessor(v.point)}
                  </text>
                </Group>
              ))}
          </g>
        </Group>
        <MouseTracker
          width={width}
          height={height}
          onMouseMove={this.setCoords}
        />
      </Group>
    );
  }
}
