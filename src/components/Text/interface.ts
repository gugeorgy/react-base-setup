export interface TextProps {
  children?: React.ReactNode;
  className?: string;
  ellipsizeMode?: 'clip' | 'head' | 'middle' | 'tail';
  numberOfLines?: number;
  onPress?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  style?: React.CSSProperties | undefined;
  disabled?: boolean;
  tag?: 'p' | 'span';
  dataDetectorType?:
    | 'all'
    | 'email'
    | 'link'
    | 'none'
    | 'phoneNumber'
    | 'title';
}
