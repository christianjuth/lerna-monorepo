import {
  useEffect,
  useState,
  CSSProperties,
  Fragment,
  useRef,
  useCallback,
} from "react";
import { ReactChildren } from "./types";
import styled from "styled-components";
import { theme } from "./Theme";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useBreakPoint } from "../components/Grid/context";
import { useComponentId } from "./utils";

const Item = styled.div`
  display: flex;
  flex-direction: row;
  scroll-snap-align: start;
  scroll-snap-stop: always;
`;

const HorizontalScroll = styled.div`
  padding: 3px 0;
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex: 1;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  overflow-scrolling: touch;
  min-height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollWrap = styled.div`
  position: relative;
`;

const ButtonWrap = styled.button`
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  margin: ${theme.spacing(0, 1.5)};
  padding: 0;
  background: transparent;
  border: none;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
  z-index: ${theme.zIndex("page", 1)};
`;

function Button({
  onClick,
  direction,
  ariaLabel,
  ariaControls,
  children,
}: {
  onClick: () => any;
  direction: "left" | "right";
  ariaLabel: string;
  ariaControls: string;
  children: ReactChildren;
}) {
  return (
    <ButtonWrap
      onClick={onClick}
      style={{
        [direction]: 0,
      }}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
    >
      {children}
    </ButtonWrap>
  );
}

export declare namespace Carousel {
  export type Props<T> = {
    data: T[];
    renderItem: (props: {
      item: T;
      index: number;
      isVisible: boolean;
      width: number;
    }) => ReactChildren;
    keyExtractor: (item: T, index: number) => string | number;
    inverted?: boolean;
    ListEmptyComponent?: ReactChildren;
    className?: string;
    style?: CSSProperties;
    initialIndex?: number;
    onChange?: (index: number) => any;
    width?: number;
    spaceBetween?: number;
    hideButtons?: boolean;
    scrollBy?: "item" | "row";
    rightButtonIcon?: ReactChildren;
    leftButtonIcon?: ReactChildren;
  };
}

export function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  inverted = false,
  ListEmptyComponent,
  className,
  style,
  initialIndex = 0,
  onChange = () => {},
  width = 200,
  spaceBetween = 0,
  hideButtons,
  scrollBy = "item",
  rightButtonIcon,
  leftButtonIcon,
}: Carousel.Props<T>) {
  const [containerWidth, setContainerWidth] = useState(0);
  const isDesktop = useBreakPoint("sm");
  width = isDesktop ? width : Math.max(containerWidth, width);

  const carouselId = useComponentId("carousel");
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);
  const indexRef = useRef(index);
  const [numVisible, setNumVisible] = useState(0);
  const [snap, setSnap] = useState(true);

  useEffect(() => {
    const elm = ref.current;

    function calcualteVisible() {
      if (elm) {
        const newContainerWidth = elm.offsetWidth;
        setContainerWidth(newContainerWidth);
        const visible = Math.round(newContainerWidth / (width + spaceBetween));
        setNumVisible(visible);
      }
    }
    calcualteVisible();
    window.addEventListener("reset", calcualteVisible);

    return () => {
      window.removeEventListener("reset", calcualteVisible);
    };
  }, [index, width, spaceBetween]);

  const computedWidth = width + spaceBetween;

  // Handle resize
  useEffect(() => {
    if (ref.current) {
      // we use indexRef so this hook only runs
      // when computedWidth changes (not index)
      ref.current.scrollLeft = indexRef.current * computedWidth;
    }
  }, [computedWidth]);

  useEffect(() => {
    onChange(index);
    indexRef.current = index;
  }, [index]);

  const timeoutRef = useRef<number>();
  const updateScroll = useCallback(
    (offset: number) => {
      const scrollElm = ref.current;
      if (scrollElm) {
        window.clearTimeout(timeoutRef.current);
        setSnap(false);

        // THIS IS A HACK
        // TODO: find a way to fix this
        // Without this react is too slow to apply this
        // change possible do to batching when calling setState
        scrollElm.style.scrollSnapType = "";

        scrollElm.scrollBy({
          top: 0,
          left: computedWidth * offset,
          behavior: "smooth",
        });

        timeoutRef.current = window.setTimeout(() => {
          setSnap(true);
        }, 500);
      }
    },
    [computedWidth]
  );

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Space") {
        e.preventDefault();
        updateScroll(1);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateScroll]);

  if (data.length === 0) {
    return ListEmptyComponent ? <>{ListEmptyComponent}</> : null;
  }

  return (
    <ScrollWrap style={style} className={className}>
      {!hideButtons && (
        <Button
          direction="left"
          onClick={() => updateScroll(scrollBy === "item" ? -1 : -numVisible)}
          ariaLabel="Previous slide"
          ariaControls={carouselId}
        >
          {leftButtonIcon ?? (
            <IoIosArrowDropleftCircle
              style={{
                fontSize: 40,
                color: "#fff",
              }}
            />
          )}
        </Button>
      )}

      <HorizontalScroll
        ref={ref}
        onScroll={(e) => {
          if (e.target instanceof HTMLElement) {
            const newIndex = Math.round(e.target.scrollLeft / computedWidth);
            if (newIndex !== index) {
              setIndex(newIndex);
            }
          }
        }}
        aria-live="polite"
        id={carouselId}
        style={{
          scrollSnapType: snap ? "x mandatory" : undefined,
        }}
      >
        {(inverted ? data.reverse() : data).map((item: any, i: number) => (
          <Fragment key={keyExtractor(item, i)}>
            <Item
              style={{
                width,
                minWidth: width,
                maxWidth: width,
                marginRight: i < data.length - 1 ? spaceBetween : 0,
              }}
              aria-label={`${i + 1} of ${data.length}`}
              role="group"
              aria-roledescription="slide"
            >
              {renderItem({
                item,
                index: i,
                isVisible: i >= index && i < index + numVisible,
                width,
              })}
            </Item>
          </Fragment>
        ))}
      </HorizontalScroll>

      {!hideButtons && (
        <Button
          direction="right"
          onClick={() => updateScroll(scrollBy === "item" ? 1 : numVisible)}
          ariaLabel="Next slide"
          ariaControls={carouselId}
        >
          {rightButtonIcon ?? (
            <IoIosArrowDroprightCircle
              style={{
                fontSize: 40,
                color: "#fff",
              }}
            />
          )}
        </Button>
      )}
    </ScrollWrap>
  );
}

Carousel.useResponsiveCarouselWidth = useResponsiveCarouselWidth;
function useResponsiveCarouselWidth(desktopWidth = 500) {
  const isDesktop = useBreakPoint("sm");
  const [mobileWidth, setMobileWidth] = useState(300);

  useEffect(() => {
    function handleResize() {
      setMobileWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop ? desktopWidth : mobileWidth;
}
