import React from 'react';
import { GridChildComponentProps, areEqual } from 'react-window';
import { useWindowSize } from 'usehooks-ts';
import { CellContainer } from '../native/cell-container/cellContainer';
import { ComponentWrapper } from '../ComponentWrapper';

import { ItemData } from './GridLayoutProps';

export const Item = React.memo(
  ({
    data,
    columnIndex,
    rowIndex,
    style,
  }: GridChildComponentProps<ItemData>) => {
    // *********************************
    const { width } = useWindowSize();
    // ************************************************
    const { setSize, props, items, columnCount, rowCount } = data;

    // ************************************************
    const { extraData, gap, rowGap, columnGap } = props;

    // ************************************************
    const singleColumnIndex = columnIndex + rowIndex * columnCount;

    // ************************************************
    const setItemSize = React.useCallback(
      (index: number, size: number) => {
        if (index < items.length)
          setSize({ index, columnIndex, rowIndex }, size);
      },
      [columnIndex, items.length, rowIndex, setSize],
    );
    // ************************************************
    const getCellContainerPlatformStyles = (): object => {
      if (
        (!gap && !rowGap && columnGap) ||
        singleColumnIndex === items.length - 1
      ) {
        return {};
      }

      let ss = {};
      if (columnIndex < columnCount - 1) {
        ss = { ...ss, paddingRight: gap ?? rowGap ?? 0 };
      }
      if (rowIndex < rowCount - 1) {
        ss = { ...ss, paddingBottom: gap ?? columnGap ?? 0 };
      }

      return ss;
    };
    // ************************************************
    const rowRendererWithIndex = () =>
      props.renderItem?.({
        item: items[singleColumnIndex],
        index: singleColumnIndex,
        extraData,
      }) as JSX.Element;

    // ************************************************
    const getCellContainerChild = () => {
      if (singleColumnIndex >= items.length) {
        return null;
      }
      return rowRendererWithIndex();
    };
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
          }}
          arg={singleColumnIndex}
          setSize={setItemSize}
          windowWidth={width}
          renderer={getCellContainerChild}
        />
      </CellRendererComponent>
    );
  },
  areEqual,
);

Item.displayName = 'Item';
