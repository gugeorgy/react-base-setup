/* eslint-disable react/prop-types */
import React from 'react';
import { ComponentWrapperProps } from './ComponentWrapperProps';

export function ComponentWrapper({
  arg,
  setSize,
  windowWidth,
  renderer,
  horizontal,
  ...props
}: ComponentWrapperProps) {
  const rowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (rowRef.current && setSize) {
      const rec = rowRef.current.getBoundingClientRect();
      setSize(arg as number, horizontal ? rec.width : rec.height);
      // console.log(`Row ${arg} :`, {
      //   // width: rec.width,
      //   height: rec.height,
      // });
    }
  }, [setSize, arg, windowWidth, horizontal]);

  return (
    <div
      ref={rowRef}
      className={props?.className as string}
      style={{
        overflow: 'hidden',
        ...(props?.style as object),
        ...(props?.contentStyle as object),
      }}
    >
      {renderer(arg)}
    </div>
  );
}
