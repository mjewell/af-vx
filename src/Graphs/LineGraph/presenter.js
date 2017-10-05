import { curveLinear } from '@vx/curve';
import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { Tooltip } from '@vx/tooltip';
import { extent } from 'd3-array';
import { flatten, mean } from 'lodash';
import React, { Component } from 'react';

import GraphArea from './GraphArea';
import MouseTracker from './MouseTracker';

export default class LineGraph extends Component {
  state = { closest: null };

  setClosest = ({ closest }) => {
    this.setState({ closest });
  };

  renderLines = ({ xScale, yScale, closest }) => {
    const { data: dataset, xAccessor, yAccessor } = this.props;
    return Object.values(dataset).map(({ data, color }) => (
      <LinePath
        data={data}
        xScale={xScale}
        yScale={yScale}
        x={xAccessor}
        y={yAccessor}
        strokeWidth={2}
        stroke={color}
        curve={curveLinear}
        glyph={(d, i) => {
          return (
            <g key={`line-point-${i}`}>
              <GlyphDot
                cx={xScale(xAccessor(d))}
                cy={yScale(yAccessor(d))}
                r={5}
                stroke={color}
                fill={
                  closest && closest.getTime() === xAccessor(d).getTime()
                    ? '#FFF'
                    : color
                }
              />
            </g>
          );
        }}
      />
    ));
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

    const tooltipTop =
      yScale(
        mean(
          flatten(
            Object.values(data).map(d =>
              d.data.filter(
                d =>
                  this.state.closest &&
                  this.state.closest.getTime() === xAccessor(d).getTime()
              )
            )
          ).map(yAccessor)
        ) || 0
      ) + margin.top;

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height} fill="#F6F6F6">
          <GraphArea
            {...this.props}
            xMax={xMax}
            yMax={yMax}
            xScale={xScale}
            yScale={yScale}
          />
          <Group top={margin.top} left={margin.left}>
            {this.renderLines({ xScale, yScale, closest: this.state.closest })}
          </Group>
          <MouseTracker
            data={data}
            x={margin.left}
            y={margin.top}
            width={xMax}
            height={yMax}
            xAccessor={xAccessor}
            xScale={xScale}
            onMouseMove={this.setClosest}
          />
        </svg>
        <Tooltip
          top={tooltipTop}
          left={xScale(this.state.closest) + margin.left + 10}
          style={{
            backgroundColor: '#222',
            color: '#FFF'
          }}
        >
          hello
        </Tooltip>
      </div>
    );
  }
}
