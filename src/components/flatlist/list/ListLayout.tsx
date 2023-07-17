/* eslint-disable react/prop-types */

import React from 'react';
import Item from './Item';
import { FlatListProps } from '../FlatListProps';
import ContentContainer from '../ContentContainer';

interface ListLayoutProps {
  items: ReadonlyArray<unknown>;
  props: FlatListProps<unknown>;
}

export default function ListLayout({ items, props }: ListLayoutProps) {
  const {
    ContentContainerComponent: ContainerComponent,
    keyExtractor,
    spacing,
  } = props;

  // ************************************************
  const itemKey = React.useCallback(
    (index: number): string => {
      if (keyExtractor) {
        return keyExtractor(items[index], index);
      }
      const item = items[index];

      if (typeof item === 'object' && item) {
        const it = item as { [key: string]: any };

        if (Object.keys(item).includes('key')) {
          return it.key.toString();
        }
        if (Object.keys(item).includes('id')) {
          return it.id.toString();
        }
      }

      return index.toString();
    },
    [items, keyExtractor],
  );

  // ************************************************
  const ContentContainerComponent = ContainerComponent ?? ContentContainer;

  return (
    <ContentContainerComponent
      spacing={spacing}
      overflowX="auto"
      align="stretch"
    >
      {items.map((_item, index) => (
        <Item
          key={itemKey(index)}
          items={items}
          index={index}
          props={props}
        />
      ))}
    </ContentContainerComponent>
  );
}
