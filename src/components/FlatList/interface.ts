export interface ListRenderItemInfo<ItemT> {
  item: ItemT;
  index?: number;
}

export interface FlatListProps<ItemT> {
  data?: ReadonlyArray<ItemT> | (() => ReadonlyArray<ItemT>);
  keyExtractor?: (item: ItemT, index: number) => string | number;
  renderItem?: (info: ListRenderItemInfo<ItemT>) => React.ReactNode;
  ItemSeparatorComponent?: React.ReactNode;
}
