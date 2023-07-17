import React from 'react';
import { HStack } from '@chakra-ui/react';

const ContentContainer = React.forwardRef((props: any, ref) => (
  <HStack ref={ref} {...props} />
));

ContentContainer.displayName = 'ContentContainer';

export default ContentContainer;
