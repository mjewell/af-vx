import { Tooltip, withTooltip } from '@vx/tooltip';
import React from 'react';

export default WrappedComponent =>
  withTooltip(props => {
    const { tooltipContent, tooltipData, tooltipTop, tooltipLeft } = props;

    return (
      <div>
        <WrappedComponent {...props} />
        {tooltipData && (
          <Tooltip
            top={tooltipTop - 20}
            left={tooltipLeft + 12}
            style={{
              backgroundColor: '#222',
              color: '#FFF'
            }}
          >
            {tooltipContent(tooltipData)}
          </Tooltip>
        )}
      </div>
    );
  });
