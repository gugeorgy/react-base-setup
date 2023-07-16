// My main theme entrypoint

import { extendTheme } from '@chakra-ui/react';
import styles from './style';

const colors = {
  body: '#F5F5F5',
  base: '#333333',
};

const layerStyles = {};

const overrides = {
  colors,
  styles,
  layerStyles,
  components: {},
};

export default extendTheme(overrides);
