import { Children, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactChildren } from "./types";
import { useDebouncedCallback } from "./utils";

const SPACING = 10;

const BoxDiv = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% / var(--masonry-cols));
  page-break-inside: avoid;
  margin-bottom: ${SPACING}px;

  &[data-left-padding="true"] > div {
    margin-left: ${SPACING}px;
  }

  & > div {
    width: 100%;
  }
`;

const Row = styled.div<{ $cols: number }>`
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  height: 2670px;

  --masonry-cols: ${({ $cols }) => $cols};
`;

export function MasonryGrid({
  children,
  itemMinWidth = 300,
}: {
  children: ReactChildren;
  itemMinWidth?: number;
}) {
  const childrenArr = Children.toArray(children);

  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const [cols, setCols] = useState(4);

  const reflowContent = useDebouncedCallback(() => {
    const elm = ref.current;
    let maxHeight = 0;

    if (elm) {
      const newCols = Math.round(elm.clientWidth / itemMinWidth);
      const columnHeights = new Array(newCols).fill(0);

      const children = elm.children;

      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        if (child.className.includes("line-break")) {
          continue;
        }

        const childHeight = child.clientHeight + SPACING;
        maxHeight = Math.max(maxHeight, childHeight);

        const currentMinColumnIndex = columnHeights.indexOf(
          Math.min(...columnHeights)
        );
        columnHeights[currentMinColumnIndex] += childHeight;
        const order = currentMinColumnIndex + 1;
        child.style.order = `${order}`;

        if (order > 1) {
          child.dataset.leftPadding = "true";
        } else {
          child.dataset.leftPadding = "false";
        }
      }

      // TODO: remove the +5 hack
      const newHeight = Math.ceil(Math.max(...columnHeights)) + 5;
      setHeight(isFinite(newHeight) ? newHeight : undefined);
      setCols(newCols);
    }
  }, [itemMinWidth]);

  useEffect(() => {
    reflowContent();
    window.addEventListener("resize", reflowContent);
    return () => {
      window.removeEventListener("resize", reflowContent);
    };
  }, [reflowContent]);

  const lineBreaks = new Array(Math.max(cols - 1, 0))
    .fill(0)
    .map((_, index) => (
      <span
        className="line-break"
        key={"line-break" + index}
        style={{
          flexBasis: "100%",
          width: 0,
          margin: 0,
          padding: 0,
          order: index + 1,
        }}
      />
    ));

  return (
    <Row ref={ref} style={{ height }} $cols={cols}>
      {childrenArr.map((child, i) => (
        <BoxDiv key={i}>
          <div>{child}</div>
        </BoxDiv>
      ))}
      {lineBreaks}
    </Row>
  );
}
