import { Ref, useRef, useEffect, forwardRef } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';

export interface BodyProps {
  height: number;
  itemCount: number;
  renderRow: FixedSizeListProps['children'];
  onScrollbarOffsetChange: (offset: number) => void;
}

const Body = ({ height, itemCount, renderRow, onScrollbarOffsetChange }: BodyProps, ref: Ref<FixedSizeList>) => {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!outerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      const borderWidth = entries?.[0]?.borderBoxSize?.[0]?.inlineSize;
      const contentWidth = entries?.[0]?.contentBoxSize?.[0]?.inlineSize;
      if (borderWidth && contentWidth)
        onScrollbarOffsetChange(borderWidth - contentWidth);
    });
    resizeObserver.observe(outerRef.current);
    return () => resizeObserver.disconnect();
  }, [onScrollbarOffsetChange]);

  return <FixedSizeList
    outerRef={outerRef}
    ref={ref}
    height={height}
    width='100vw'
    itemCount={itemCount}
    itemSize={40}
    overscanCount={5}
    className='custom-table'
    children={renderRow}
  />;
};

export default forwardRef(Body);
