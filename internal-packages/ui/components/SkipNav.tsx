import * as React from "react";
import styled from "styled-components";
import { theme } from "./Theme";

const HEIGHT = "55px";

const LinkStyles = styled.a`
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  position: absolute;
  overflow: hidden;
  font-size: 1.2rem;
  :focus {
    padding: 0 1.2rem;
    position: fixed;
    background: white;
    width: auto;
    height: ${HEIGHT};
    line-height: ${HEIGHT};
    outline-color: #000;
    background-color: ${theme.color("accent1", 4)};
    background-color: -webkit-focus-ring-color;
    color: ${theme.color("accent1", 4, "text")};
    z-index: ${theme.zIndex("header", 50)};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const ID = "skip-nav";

function ResetTabIndex() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function reset() {
      ref.current?.focus();
      ref.current?.blur();
    }

    window.addEventListener("popstate", reset);
    window.addEventListener("pushstate", reset);

    return () => {
      window.removeEventListener("popstate", reset);
      window.removeEventListener("pushstate", reset);
    };
  }, []);

  return <div ref={ref} tabIndex={-1} />;
}

function Link() {
  return (
    <>
      <ResetTabIndex />
      <LinkStyles href={`#${ID}`}>Skip to content</LinkStyles>
    </>
  );
}

function Content() {
  return <a id={ID} tabIndex={-1} />;
}

export const SkipNav = {
  Content,
  Link,
};
