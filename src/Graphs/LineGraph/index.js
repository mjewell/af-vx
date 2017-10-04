import { compose } from 'recompose';

import WithTooltip from '../WithTooltip/hoc';
import Presenter from './presenter';

const container = compose(WithTooltip);

export default container(Presenter);
