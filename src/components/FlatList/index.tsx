/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FlatListProps, ListRenderItemInfo } from './interface';

const isValidKey = (item: any, index: string): boolean =>
  Object.keys(item).indexOf(index) !== -1 &&
  (typeof item[index] === 'string' || typeof item[index] === 'number');

export function FlatList<ItemT>({
  data = [],
  ItemSeparatorComponent,
  keyExtractor,
  renderItem,
}: FlatListProps<ItemT>) {
  const dataList = React.useMemo(
    () => (typeof data === 'function' ? data() : data),
    [data],
  );

  const key = (item: ItemT, index: number) => {
    if (keyExtractor) {
      return `${keyExtractor(item, index)}`;
    }
    if (item && typeof item === 'object') {
      const obj = { ...item } as { [key: string]: any };
      // look for key
      if (isValidKey(obj, 'key')) {
        return `${obj.key}`;
      }
      // look for id
      if (isValidKey(obj, 'id')) {
        return `${obj.id}`;
      }
    }
    return `${index}`;
  };

  const renderer = (props: ListRenderItemInfo<ItemT>): React.ReactNode => {
    if (renderItem) return renderItem(props);
    return null;
  };

  dataList.map((it, kk) => {
    const el = renderer({ item: it, index: kk });
    if (ItemSeparatorComponent) {
      if (kk > 0 && kk < dataList.length) {
        return (
          <React.Fragment key={key(it, kk)}>
            {ItemSeparatorComponent}
            {el}
          </React.Fragment>
        );
      }
    }
    return <React.Fragment key={key(it, kk)}>{el}</React.Fragment>;
  });

  return (
    <>
      {dataList.map((it, kk) => {
        const el = renderer({ item: it, index: kk });
        if (ItemSeparatorComponent) {
          if (kk > 0 && kk < dataList.length) {
            return (
              <React.Fragment key={key(it, kk)}>
                {ItemSeparatorComponent}
                {el}
              </React.Fragment>
            );
          }
        }
        return <React.Fragment key={key(it, kk)}>{el}</React.Fragment>;
      })}
    </>
  );
}
