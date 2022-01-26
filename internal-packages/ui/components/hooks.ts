import { useState, useEffect, MutableRefObject } from "react";

export const useElementIsVisible = (
  ref: MutableRefObject<any>,
  rootMargin: number | string = 0,
  onlyFireOnce = false
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible && onlyFireOnce) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin:
          typeof rootMargin === "number" ? `${rootMargin}px` : rootMargin,
      }
    );

    const currentElement = ref?.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      observer.unobserve(currentElement);
    };
  }, [ref, rootMargin, isVisible, onlyFireOnce]);

  return isVisible;
};
