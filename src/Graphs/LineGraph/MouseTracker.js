import { localPoint } from '@vx/event';
import { Bar } from '@vx/shape';
import { bisector } from 'd3-array';
import { compact, flatten, minBy } from 'lodash';
import React, { Component } from 'react';

export default class MouseTracker extends Component {
  getAdjacentPoints = x => {
    const { data, xAccessor } = this.props;
    const bisectDate = bisector(xAccessor).left;
    const datasets = Object.values(data).map(d => d.data);
    const indices = datasets.map(d => bisectDate(d, x));
    return compact(
      flatten(
        indices.map((index, i) => [datasets[i][index - 1], datasets[i][index]])
      )
    );
  };

  onMouseMove = () => event => {
    const { xScale, xAccessor, onMouseMove } = this.props;

    const { x } = localPoint(this.area, event);
    const x0 = xScale.invert(x);
    const points = this.getAdjacentPoints(x0);
    const closest = minBy(points, point => Math.abs(xAccessor(point) - x0));
    onMouseMove({ closest: xAccessor(closest), points: [] });
  };

  onMouseLeave = () => () => this.props.onMouseMove({ closest: null });

  render() {
    const { x, y, width, height } = this.props;

    return (
      <svg
        ref={s => {
          this.area = s;
        }}
        x={x}
        y={y}
        width={width}
        height={height}
      >
        <Bar
          width={width}
          height={height}
          fill="transparent"
          onMouseMove={this.onMouseMove}
          onMouseLeave={this.onMouseLeave}
        />
      </svg>
    );
  }
}
