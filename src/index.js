import './index.css';

import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import LineGraph from './Graphs/LineGraph';
import registerServiceWorker from './registerServiceWorker';

const data = [
  { date: new Date('2017-01-01'), value: 10 },
  { date: new Date('2017-02-01'), value: 20 },
  { date: new Date('2017-03-01'), value: 30 },
  { date: new Date('2017-04-01'), value: 20 },
  { date: new Date('2017-05-01'), value: 40 }
];

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
    width={1000}
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
