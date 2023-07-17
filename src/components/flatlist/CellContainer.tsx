import React from 'react';
import { Box } from '@chakra-ui/react';

const CellContainer = React.forwardRef((props: any, ref) => (
  // <HStack ref={ref} {...props} />
  <Box ref={ref} flexShrink="0" {...props} />
));

CellContainer.displayName = 'CellContainer';

export default CellContainer;
