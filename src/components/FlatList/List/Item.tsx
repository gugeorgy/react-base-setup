import React from 'react';
import { ListChildComponentProps, areEqual } from 'react-window';
import { useWindowSize } from 'usehooks-ts';
import { CellContainer } from '../native/cell-container/cellContainer';
import { ComponentWrapper } from '../ComponentWrapper';

import { ItemData } from './ListLayoutProps';

export const Item = React.memo(
  ({ data, index, style }: ListChildComponentProps<ItemData>) => {
    // *********************************
    const { width } = useWindowSize();
    // ************************************************
    const { setSize, props, items } = data;
    // ************************************************
    const {
      horizontal,
      gap,
      rowGap,
      columnGap,
      ItemSeparatorComponent,
      extraData,
    } = props;
    // ************************************************
    const getCellContainerPlatformStyles = (): object => {
      if ((!gap && !rowGap && !columnGap) || index + 1 >= items.length) {
        return {};
      }
      return horizontal ? { paddingRight: gap } : { paddingBottom: gap };
    };
    // ************************************************
    const rowRendererWithIndex = () =>
      props.renderItem?.({
        item: items[index],
        index,
        extraData,
      }) as JSX.Element;

    // ************************************************
    const separator = () => {
      // Make sure we have data and don't read out of bounds
      if (index + 1 >= items.length) {
        return null;
      }

      const leadingItem = items[index];
      const trailingItem = items[index + 1];

      const SeparatorProps = {
        leadingItem,
        trailingItem,
      };
      const Separator = ItemSeparatorComponent;
      return Separator && <Separator {...SeparatorProps} />;
    };
    // ************************************************
    const getCellContainerChild = () => (
      <>
        {rowRendererWithIndex()}
        {separator()}
      </>
    );
    // ************************************************

    const CellRendererComponent =
      props.CellRendererComponent ?? CellContainer;
    return (
      <CellRendererComponent
        className="cell-component"
        style={{
          ...style,
        }}
      >
        <ComponentWrapper
          className="item-component"
          contentStyle={{
            ...getCellContainerPlatformStyles(),
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column',
            alignItems: 'stretch',
            gap: (ItemSeparatorComponent && gap) ?? undefined,
            width: horizontal ? 'max-content' : undefined,
          }}
          arg={index}
          setSize={setSize}
          horizontal={Boolean(horizontal)}
          windowWidth={width}
          renderer={getCellContainerChild}
        />
      </CellRendererComponent>
    );
  },
  areEqual,
);

Item.displayName = 'Item';
