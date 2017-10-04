import { curveLinear } from '@vx/curve';
import { GlyphDot } from '@vx/glyph';
import { Group } from '@vx/group';
import { scaleLinear, scaleTime } from '@vx/scale';
import { LinePath } from '@vx/shape';
import { extent } from 'd3-array';
import React, { Component } from 'react';

import Tooltip from '../WithTooltip/Tooltip';
import GraphArea from './GraphArea';

export default class LineGraph extends Component {
  state = { dummy: false };

  renderLines = ({ xScale, yScale }) => {
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
                fill={color}
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

    return (
      <svg
        ref={s => {
          this.svg = s;
          if (!this.state.dummy) {
            this.setState({ dummy: true });
          }
        }}
        width={width}
        height={height}
        fill="#F6F6F6"
      >
        <GraphArea
          {...this.props}
          xMax={xMax}
          yMax={yMax}
          xScale={xScale}
          yScale={yScale}
        />
        <Group top={margin.top} left={margin.left}>
          {this.renderLines({ xScale, yScale })}
        </Group>
        <Tooltip
          {...this.props}
          data={data.Test_1.data}
          xMax={xMax}
          yMax={yMax}
          xScale={xScale}
          yScale={yScale}
          svg={this.svg}
        />
      </svg>
    );
  }
}
