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

const numPoints = 1000;

const data = [
  {
    name: 'Ryan',
    data: range(numPoints).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 5)
    })),
    color: '#2DA5DC'
  },
  {
    name: 'Brent',
    data: range(numPoints).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 10)
    })),
    color: '#C61A0C'
  },
  {
    name: 'MLevin',
    data: range(numPoints).map(d => ({
      date: moment('2017-01-01')
        .add(d, 'days')
        .toDate(),
      value: generateRandom(0, 100, 15)
    })),
    color: '#0CC61A'
  }
];

const margin = {
  left: 60,
  right: 50,
  top: 20,
  bottom: 40
};

const xAccessor = d => d.date;
const yAccessor = d => d.value;

ReactDOM.render(
  <LineGraph
    data={data}
    width={1000}
    height={500}
    margin={margin}
    yDomain={[0, 100]}
    xAxisLabel="Date"
    yAxisLabel="Dollarydoos (AUD)"
    yAxisFormat={value => `$${value}`}
    xAccessor={xAccessor}
    yAccessor={yAccessor}
  />,
  document.getElementById('root')
);
registerServiceWorker();
