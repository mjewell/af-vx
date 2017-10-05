import { localPoint } from '@vx/event';
import { Bar } from '@vx/shape';
import React, { Component } from 'react';

export default class MouseTracker extends Component {
  onMouseMove = () => event => {
    const { onMouseMove } = this.props;
    const { x, y } = localPoint(this.area, event);
    onMouseMove({ x, y });
  };

  onMouseLeave = () => () => this.props.onMouseMove({ x: null, y: null });

  render() {
    const { width, height } = this.props;

    return (
      <svg
        ref={s => {
          this.area = s;
        }}
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
