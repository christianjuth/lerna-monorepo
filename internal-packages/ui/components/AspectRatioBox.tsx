import { CSSProperties } from "react";
import styled, { css } from "styled-components";
import { BreakpointGenerator } from "../components/Grid/types";
import { computeBreakpoints } from "./Grid/utils";
import { theme } from "./Theme";
import { ReactChildren } from "./types";

function generateVarName(breakpoint: string) {
  return `--aspectRatio-${breakpoint}`;
}

const aspectRatioStyles = css`
  aspect-ratio: var(${generateVarName("base")});
  @media ${theme.mediaQuery("xs", "sm")} {
    aspect-ratio: var(${generateVarName("xs")});
  }
  @media ${theme.mediaQuery("sm", "md")} {
    aspect-ratio: var(${generateVarName("sm")});
  }
  @media ${theme.mediaQuery("md", "lg")} {
    aspect-ratio: var(${generateVarName("md")});
  }
  @media ${theme.mediaQuery("lg", "xl")} {
    aspect-ratio: var(${generateVarName("lg")});
  }
  @media ${theme.mediaQuery("xl", "xxl")} {
    aspect-ratio: var(${generateVarName("xl")});
  }
  @media ${theme.mediaQuery("xxl")} {
    aspect-ratio: var(${generateVarName("xxl")});
  }
  @supports not (aspect-ratio: 16 / 9) {
    &::before {
      content: "";
      width: 1px;
      margin-left: -1px;
      float: left;
      height: 0;
      patting-top: calc(100% / var(${generateVarName("base")}));
    }
    &::after {
      /* to clear float */
      content: "";
      display: table;
      clear: both;
    }
    @media ${theme.mediaQuery("xs", "sm")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("xs")}));
      }
    }
    @media ${theme.mediaQuery("sm", "md")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("sm")}));
      }
    }
    @media ${theme.mediaQuery("md", "lg")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("md")}));
      }
    }
    @media ${theme.mediaQuery("lg", "xl")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("lg")}));
      }
    }
    @media ${theme.mediaQuery("xl", "xxl")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("xl")}));
      }
    }
    @media ${theme.mediaQuery("xxl")} {
      &::before {
        padding-top: calc(100% / var(${generateVarName("xxl")}));
      }
    }
  }
  display: block;
  width: 100%;
  position: relative;
`;

const AspectRatioDiv = styled.div`
  ${aspectRatioStyles}
`;

const absoluteFill = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: inherit;
`;

const AbsoluteFillDiv = styled.div`
  ${absoluteFill}
`;

export declare namespace AspectRatioBox {
  type AspectRatio = number;
  type AspectRatioByBreakpoint = Partial<BreakpointGenerator<AspectRatio>>;

  interface Props {
    aspectRatio?: number;
    aspectRatioByBreakpoint?: AspectRatioByBreakpoint;
    children?: ReactChildren;
    className?: string;
    style?: CSSProperties;
    onClick?: () => any;
  }
}

function getBreakpointCssVars(
  aspectRatio: AspectRatioBox.AspectRatio = 1,
  aspectRatioByBreakpoint?: AspectRatioBox.AspectRatioByBreakpoint
) {
  const computedAspectRatioByBreakpoint = computeBreakpoints(
    // fallback to aspectRatio if aspectRatioByBreakpoint unspecified
    aspectRatioByBreakpoint ?? { xs: aspectRatio }
  );

  const cssVars: Record<string, number> = {};
  Object.entries(computedAspectRatioByBreakpoint).forEach(
    ([breakpoint, value]) => {
      cssVars[generateVarName(breakpoint)] = value;
    }
  );
  return cssVars;
}

export function AspectRatioBox({
  aspectRatio,
  aspectRatioByBreakpoint,
  children,
  className,
  style,
  onClick,
}: AspectRatioBox.Props) {
  const cssVars = getBreakpointCssVars(aspectRatio, aspectRatioByBreakpoint);

  return (
    <AspectRatioDiv
      className={className}
      onClick={onClick}
      style={{
        ...cssVars,
        ...style,
      }}
    >
      {children}
    </AspectRatioDiv>
  );
}
