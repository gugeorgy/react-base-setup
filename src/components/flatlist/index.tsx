import React from 'react';
import { FlatListProps } from './FlatListProps';
import ListLayout from './list/ListLayout';

function FlatList<TItem>(props: FlatListProps<TItem>) {
  const { data, ListEmptyComponent } = props;

  // ************************************************
  const items = React.useMemo<ReadonlyArray<TItem>>(
    () => data ?? [],
    [data],
  );

  // ************************************************
  const isEmptyList = React.useMemo<boolean>(
    () => items.length === 0,
    [items.length],
  );

  // ************************************************
  const getValidComponent = (
    component: React.ComponentType | React.ReactElement | null | undefined,
  ) => {
    const PassedComponent = component;

    return React.isValidElement(PassedComponent) ? PassedComponent : null;

    // return (
    //   (React.isValidElement(PassedComponent) && PassedComponent) ||
    //   (PassedComponent && <PassedComponent />) ||
    //   null
    // );
  };

  if (isEmptyList) return getValidComponent(ListEmptyComponent);

  return (
    <ListLayout items={items} props={props as FlatListProps<unknown>} />
  );
}

export default React.memo(FlatList) as typeof FlatList;
