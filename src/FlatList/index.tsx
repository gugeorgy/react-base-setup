import React from 'react';

import AutoSizer from 'react-virtualized-auto-sizer';

import { FlatListProps } from './FlatListProps';
import { GridLayout } from './Grid/GridLayout';
import { ListLayout } from './List/ListLayout';

export function FlatList<T>(props: FlatListProps<T>) {
  // *********************************
  const {
    data,
    estimatedItemSize,
    onLoad,
    hasNextPage,
    ListEmptyComponent,
    numColumns,
    keyExtractor,
    ItemSeparatorComponent,
    gap,
  } = props;
  // *********************************
  const isListLoaded = React.useRef<boolean>(false);
  const sizeMap = React.useRef<object>({});
  const loadStartTime = React.useRef<number>(0);
  // *********************************
  const DATA = React.useMemo<readonly T[]>(() => {
    if (data) {
      if (typeof data === 'function') {
        return data();
      }
      return data;
    }
    return [];
  }, [data]);

  const isEmptyList = React.useMemo<boolean>(
    () => DATA.length === 0,
    [DATA.length],
  );

  const itemCount = React.useMemo(
    () => (hasNextPage ? DATA.length + 1 : DATA.length),
    [DATA, hasNextPage],
  );
  // ************************************************
  const getValidComponent = (
    component: React.ComponentType | React.ReactElement | null | undefined,
  ) => {
    const PassedComponent = component;
    return (
      (React.isValidElement(PassedComponent) && PassedComponent) ||
      (PassedComponent && <PassedComponent />) ||
      null
    );
  };

  // *********************************
  const raiseOnLoadEventIfNeeded = React.useCallback(() => {
    if (!isListLoaded.current) {
      isListLoaded.current = true;
      if (onLoad)
        onLoad({ elapsedTimeInMs: Date.now() - loadStartTime.current });
      // runAfterOnLoad();
    }
  }, [onLoad]);

  const itemSize = React.useCallback(
    (index: number) => {
      const defaultItemSize = 100;
      const columnCount = numColumns ?? 1;
      const rowCount = Math.ceil(itemCount / columnCount);
      if (estimatedItemSize) {
        if (!gap || index === rowCount - 1) {
          return estimatedItemSize;
        }
        const moreGap = (ItemSeparatorComponent && gap) ?? 0;
        return estimatedItemSize + gap + moreGap;
      }
      if (sizeMap.current) {
        const start = index * columnCount;
        const end = start + columnCount;
        const max = Math.max(
          ...Object.values(sizeMap.current).slice(start, end),
        );
        return max > 0 ? max : defaultItemSize;
      }
      return defaultItemSize;
    },
    [
      ItemSeparatorComponent,
      estimatedItemSize,
      gap,
      itemCount,
      numColumns,
    ],
  );

  const itemKey = React.useCallback(
    (index: number): string => {
      if (keyExtractor) {
        return keyExtractor(DATA[index], index);
      }
      const item = DATA[index];
      if (typeof item === 'object' && item) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    [DATA, keyExtractor],
  );

  // ************************************************
  // ************************************************
  React.useEffect(() => {
    if (isEmptyList) {
      raiseOnLoadEventIfNeeded();
    }
  }, [isEmptyList, raiseOnLoadEventIfNeeded]);

  return isListLoaded.current ? (
    <AutoSizer className="AutoSizer">
      {({ height, width }) => {
        if (isEmptyList) return getValidComponent(ListEmptyComponent);
        return !numColumns || numColumns === 1 ? (
          <ListLayout
            height={height}
            width={width}
            items={DATA}
            itemKey={itemKey}
            itemCount={itemCount}
            itemSize={itemSize}
            sizeMap={sizeMap}
            props={props}
          />
        ) : (
          <GridLayout
            height={height}
            width={width}
            items={DATA}
            itemKey={itemKey}
            itemCount={itemCount}
            itemSize={itemSize}
            sizeMap={sizeMap}
            props={props}
          />
        );
      }}
    </AutoSizer>
  ) : null;
}
