import { TextProps } from './interface';

export function Text({
  children,
  className,
  style,
  onPress,
  tag: Tag = 'span',
}: TextProps) {
  return (
    <Tag className={className} style={style} onClick={onPress}>
      {children}
    </Tag>
  );
}
