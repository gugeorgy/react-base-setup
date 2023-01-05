export interface ComponentWrapperProps {
  setSize?: (arg: number, size: number) => void;
  windowWidth?: number;
  renderer: (arg: unknown) => JSX.Element | null;
  arg?: unknown;
  horizontal?: boolean;
  [other: string]: unknown;
}
