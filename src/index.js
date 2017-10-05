import './index.css';

import { random, range } from 'lodash';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import LineGraph from './Graphs/LineGraph';
import registerServiceWorker from './registerServiceWorker';

let prev = random(0, 100);

const generateRandom = (low, high, range) => {
  prev = Math.max(Math.min(high, prev + random(-range, range)), low);
  return prev;
};

const data = {
  Test_1: {
    data: range(100).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 5)
    })),
    color: '#2DA5DC'
  },
  Test_2: {
    data: range(100).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 10)
    })),
    color: '#C61A0C'
  },
  Test_3: {
    data: range(100).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 15)
    })),
    color: '#0CC61A'
  }
};

const margin = {
  left: 90,
  right: 50,
  top: 20,
  bottom: 60
};

const xAccessor = d => d.date;
const yAccessor = d => d.value;

ReactDOM.render(
  <LineGraph
    data={data}
    width={1750}
    height={500}
    margin={margin}
    yDomain={[0, 100]}
    xAxisLabel="Date"
    yAxisLabel="Dollarydoos (AUD)"
    yAxisFormat={value => `$${value}`}
    xAccessor={xAccessor}
    yAccessor={yAccessor}
    tooltipContent={tooltipData => (
      <div>
        <div style={{ fontWeight: 700 }}>
          {moment(xAccessor(tooltipData)).format('MMM YYYY')}
        </div>
        {`$${yAccessor(tooltipData)}`}
      </div>
    )}
  />,
  document.getElementById('root')
);
registerServiceWorker();
