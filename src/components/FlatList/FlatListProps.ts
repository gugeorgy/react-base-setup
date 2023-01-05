// /* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';

export interface ListRenderItemInfo<ItemT> {
  item: ItemT;
  index: number;
  extraData?: any;
}

export type ListRenderItem<ItemT> = (
  info: ListRenderItemInfo<ItemT>,
) => React.ReactElement | null;

export interface ContentStyle {
  backgroundColor?: string;
  gap: number;
}

export interface FlatListProps<ItemT> {
  /**
   * Takes an item from `data` and renders it into the list. Typical usage:
   * ```ts
   * renderItem = ({item}) => (
   *   <Text>{item.title}</Text>
   * );
   * ...
   * <FlashList data={[{title: 'Title Text', key: 'item1'}]} renderItem={renderItem} />
   *
   * Provides additional metadata like `index`
   *
   * - `item` (`Object`): The item from `data` being rendered.
   * - `index` (`number`): The index corresponding to this item in the `data` array.
   */
  renderItem: ListRenderItem<ItemT> | null | undefined;

  /**
   * For simplicity, data is a plain array of items of a given type.
   */
  data:
    | ReadonlyArray<ItemT>
    | (() => ReadonlyArray<ItemT>)
    | null
    | undefined;

  /**
   * Average or median size for elements in the list. Doesn't have to be very accurate but a good estimate can improve performance.
   * A quick look at `Element Inspector` can help you determine this. If you're confused between two values, the smaller value is a better choice.
   * For vertical lists provide average height and for horizontal average width.
   * Read more about it here: https://shopify.github.io/flash-list/docs/estimated-item-size
   */
  estimatedItemSize?: number;

  /**
   * Visible height and width of the list. This is not the scroll content size.
   */
  estimatedListSize?: { height: number; width: number };

  /**
   * The gap (horizontal/vertical) to display between each item.
   */
  gap?: number;
  /**
   * The horizontal gap to display between each item.
   */
  rowGap?: number;
  /**
   * The vertical gap to display between each item.
   */
  columnGap?: number;

  /**
   * Each cell is rendered using this element.
   * Can be a React Component Class, or a render function.
   * The root component should always be a `CellContainer` which is also the default component used.
   * Ensure that the original `props` are passed to the returned `CellContainer`. The `props` will include the following:
   * - `onLayout`: Method for updating data about the real `CellContainer` layout
   * - `index`: Index of the cell in the list, you can use this to query data if needed
   * - `style`: Style of `CellContainer`, including:
   *   - `flexDirection`: Depends on whether your list is horizontal or vertical
   *   - `position`: Value of this will be `absolute` as that's how `FlashList` positions elements
   *   - `left`: Determines position of the element on x axis
   *   - `top`: Determines position of the element on y axis
   *   - `width`: Determines width of the element (present when list is vertical)
   *   - `height`: Determines height of the element (present when list is horizontal)
   *
   * Note: Changing layout of the cell can conflict with the native layout operations. You may need to set `disableAutoLayout` to `true` to prevent this.
   */
  CellRendererComponent?: React.ComponentType<any>;

  /**
   * Rendered in between each item, but not at the top or bottom. By default, `leadingItem` and `trailingItem` (if available) props are provided.
   */
  ItemSeparatorComponent?: React.ComponentType<{
    leadingItem: ItemT;
    trailingItem: ItemT;
  }> | null;

  /**
   * Rendered when the list is empty. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).
   */
  ListEmptyComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null;

  /**
   * Rendered at the bottom of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).
   */
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;

  /**
   * Styling for internal View for `ListFooterComponent`.
   */
  ListFooterComponentStyle?: React.CSSProperties;

  /**
   * Rendered at the top of all the items. Can be a React Component (e.g. `SomeComponent`), or a React element (e.g. `<SomeComponent />`).
   */
  ListHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement
    | null;

  /**
   * Styling for internal View for `ListHeaderComponent`.
   */
  ListHeaderComponentStyle?: React.CSSProperties;

  /**
   * You can use `contentContainerStyle` to apply padding that will be applied to the whole content itself.
   * For example, you can apply this padding, so that all of your items have leading and trailing space.
   */
  contentContainerStyle?: ContentStyle;

  /**
   * A marker property for telling the list to re-render (since it implements PureComponent).
   * If any of your `renderItem`, Header, Footer, etc. functions depend on anything outside of the `data` prop,
   * stick it here and treat it immutably.
   */
  extraData?: any;

  /**
   * If true, renders items next to each other horizontally instead of stacked vertically.
   */
  horizontal?: boolean | null;

  hasNextPage?: boolean | null;

  /**
   * Callback to be invoked when more rows must be loaded.
   * It should return a Promise that is resolved once all data has finished loading. */
  loadMoreItems?: (startIndex: number, stopIndex: number) => Promise<void>;

  /**
   * Instead of starting at the top with the first item, start at initialScrollIndex.
   */
  initialScrollIndex?: number | null;

  /**
   * Reverses the direction of scroll. Uses scale transforms of -1.
   */
  inverted?: boolean | null;

  /**
   * Used to extract a unique key for a given item at the specified index.
   * Key is used for optimizing performance. Defining `keyExtractor` is also necessary
   * when doing [layout animations](https://flash-list.docs.shopify.io/guides/layout-animation)
   * to uniquely identify animated components.
   */
  keyExtractor?: (item: ItemT, index: number) => string;

  /**
   * Multiple columns can only be rendered with `horizontal={false}` and will zig-zag like a `flexWrap` layout.
   * Items should all be the same height - masonry layouts are not supported.
   */
  numColumns?: number;

  /**
   * Called once when the scroll position gets within onEndReachedThreshold of the rendered content.
   */
  onEndReached?: (() => void) | null;

  /**
   * How far from the end (in units of visible length of the list) the bottom edge of the
   * list must be from the end of the content to trigger the `onEndReached` callback.
   * Thus a value of 0.5 will trigger `onEndReached` when the end of the content is
   * within half the visible length of the list.
   */
  onEndReachedThreshold?: number | null;

  /**
   * This event is raised once the list has drawn items on the screen. It also reports @param elapsedTimeInMs which is the time it took to draw the items.
   * This is required because FlashList doesn't render items in the first cycle. Items are drawn after it measures itself at the end of first render.
   * If you're using ListEmptyComponent, this event is raised as soon as ListEmptyComponent is rendered.
   */
  onLoad?: (info: { elapsedTimeInMs: number }) => void;

  /**
   * If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality.
   * Make sure to also set the refreshing prop correctly.
   */
  onRefresh?: (() => void) | null;

  /**
   * Allows developers to override type of items. This will improve recycling if you have different types of items in the list
   * Right type will be used for the right item. Default type is 0
   * If you don't want to change for an indexes just return undefined.
   * Performance: This method is called very frequently. Keep it fast.
   */
  getItemType?: (
    item: ItemT,
    index: number,
    extraData?: any,
  ) => string | number;

  /**
   * This method can be used to provide explicit size estimates or change column span of an item.
   *
   * Providing specific estimates is a good idea when you can calculate sizes reliably. FlashList will prefer this value over `estimatedItemSize` for that specific item.
   * Precise estimates will also improve precision of `scrollToIndex` method and `initialScrollIndex` prop. If you have a `separator` below your items you can include its size in the estimate.
   *
   * Changing item span is useful when you have grid layouts (numColumns > 1) and you want few items to be bigger than the rest.
   *
   * Modify the given layout. Do not return. FlashList will fallback to default values if this is ignored.
   *
   * Performance: This method is called very frequently. Keep it fast.
   */
  overrideItemLayout?: (
    layout: { span?: number; size?: number },
    item: ItemT,
    index: number,
    maxColumns: number,
    extraData?: any,
  ) => void;

  /**
   * For debugging and exception use cases, internal props will be overriden with these values if used
   */
  overrideProps?: object;

  /**
   * Set this true while waiting for new data from a refresh.
   */
  refreshing?: boolean | null | undefined;

  /**
   * FlashList applies some fixes to layouts of its children which can conflict with custom `CellRendererComponent`
   * implementations. You can disable this behavior by setting this to `true`.
   * Recommendation: Set this to `true` while you apply special behavior to the `CellRendererComponent`. Once done set this to
   * `false` again.
   */
  disableAutoLayout?: boolean;
}
