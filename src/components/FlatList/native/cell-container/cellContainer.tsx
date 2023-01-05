/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
/**
 * On web we use a view instead of cell container till we build native web implementations
 */
export const CellContainer = React.forwardRef((props: any, ref) => (
  <div ref={ref} {...props} />
));

CellContainer.displayName = 'CellContainer';
