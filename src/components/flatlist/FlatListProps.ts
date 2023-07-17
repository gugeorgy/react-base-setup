import type React from 'react';

interface ListRenderItemInfo<TItem> {
  item: TItem;
  index: number;
}

type ListRenderItem<TItem> = (
  info: ListRenderItemInfo<TItem>,
) => React.ReactElement | null;

export interface FlatListProps<TItem> {
  /**
   * For simplicity, data is a plain array of items of a given type.
   */
  data: ReadonlyArray<TItem> | null | undefined;

  /**
   * Average or median size for elements in the list. Doesn't have to be very accurate but a good estimate can improve performance.
   */
  estimatedItemSize?: number;

  /**
   * Rendered in between each item, but not at the top or bottom. By default, `leadingItem` and `trailingItem` (if available) props are provided.
   */
  ItemSeparatorComponent?: React.ComponentType<{
    leadingItem: TItem;
    trailingItem: TItem;
    // children?: React.ReactNode;
  }> | null;

  /**
   * Each cell is rendered using this element.
   */
  CellRendererComponent?: React.ComponentType<{
    item: TItem;
    index: number;
    children?: React.ReactNode;
  }>;

  /**
   * The element which contains cell.
   */
  ContentContainerComponent?: React.ComponentType<any>;

  /**
   * Used to extract a unique key for a given item at the specified index.
   */
  keyExtractor?: (item: TItem, index: number) => string;

  /**
   * Rendered when the list is empty. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).
   */
  ListEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  /**
   * Takes an item from `data` and renders it into the list. Typical usage:
   * ```ts
   * renderItem = ({item}) => (
   *   <Text>{item.title}</Text>
   * );
   * ...
   * <FlashList data={[{title: 'Title Text', key: 'item1'}]} renderItem={renderItem} />
   * ```
   *
   * Provides additional metadata like `index`
   *
   * - `item` (`Object`): The item from `data` being rendered.
   * - `index` (`number`): The index corresponding to this item in the `data` array.
   */
  renderItem: ListRenderItem<TItem> | null | undefined;

  /**
   * The space between each item
   */
  spacing?: number | string;
}
