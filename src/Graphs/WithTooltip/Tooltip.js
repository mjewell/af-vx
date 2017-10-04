import { localPoint } from '@vx/event';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { bisector } from 'd3-array';
import React, { Component } from 'react';

export default class Tooltip extends Component {
  render() {
    const {
      data,
      margin,
      xAccessor,
      yAccessor,
      xMax,
      yMax,
      xScale,
      yScale,
      tooltipData,
      tooltipLeft,
      tooltipTop,
      showTooltip,
      hideTooltip,
      svg
    } = this.props;

    const bisectDate = bisector(xAccessor).left;

    return (
      <Group>
        <Bar
          x={margin.left}
          y={margin.top}
          width={xMax}
          height={yMax}
          fill="transparent"
          onMouseLeave={() => hideTooltip}
          onMouseMove={() => (event: any) => {
            const { x } = localPoint(svg, event);
            const x0 = xScale.invert(x - margin.left);
            const index = bisectDate(data, x0, 1);
            const d0 = data[index - 1];
            const d1 = data[index];
            let d = d0;
            if (d1 && d1.date) {
              d =
                x0 - xAccessor(d0).getTime() > xAccessor(d1).getTime() - x0
                  ? d1
                  : d0;
            }
            showTooltip({
              tooltipData: d,
              tooltipLeft: xScale(xAccessor(d)) + margin.left,
              tooltipTop: yScale(yAccessor(d)) + margin.top
            });
          }}
        />
        {tooltipData && (
          <circle
            cx={tooltipLeft}
            cy={tooltipTop}
            r={4}
            fill="#FFF"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </Group>
    );
  }
}
