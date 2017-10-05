import { bisector } from 'd3-array';
import { compact, minBy } from 'lodash';

export default ({ data, value, accessor }) => {
  const bisectDate = bisector(accessor).left;
  const index = bisectDate(data, value);
  return minBy(compact([data[index - 1], data[index]]), d => {
    return Math.abs(accessor(d) - value);
  });
};
