import { FlatListProps } from '../FlatListProps';
import CellContainer from '../CellContainer';

interface ItemProps {
  index: number;
  items: ReadonlyArray<unknown>;
  props: FlatListProps<unknown>;
}

export default function Item({ index, items, props }: ItemProps) {
  const {
    CellRendererComponent: CellComponent,
    renderItem,
    ItemSeparatorComponent,
  } = props;

  // ************************************************
  const rowRendererWithIndex = () =>
    renderItem?.({
      item: items[index],
      index,
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
  const CellRendererComponent = CellComponent ?? CellContainer;

  return (
    <CellRendererComponent item={items[index]} index={index}>
      {rowRendererWithIndex()}
      {separator()}
    </CellRendererComponent>
  );
}
