import * as React from "react";
import { css } from "styled-components";
import { color } from "./Theme";
import { ReactChildren } from "./types";
import { pxToRem, useComponentId, cn } from "./utils";

const htmlTags = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "time",
  "blockquote",
  "label",
  "figcaption",
] as const;
const variants = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "copy-1",
  "copy-2",
  "p",
  "link",
] as const;

type GetArrayElementType<T extends readonly any[]> =
  T extends readonly (infer U)[] ? U : never;

export declare namespace Text {
  export interface TextElementProps {
    htmlTag?: HtmlTag;
    className?: string;
    style?: React.CSSProperties;
    children: ReactChildren<string>;
    numberOfLines?: number;
    htmlFor?: string;
    id?: string;
  }

  export interface TextProps extends TextElementProps, React.CSSProperties {
    /* Aria Label */
    ariaLabel?: string;
    ariaHidden?: boolean;
    variant?: Variant;
    uppercase?: boolean;
    noPadding?: boolean;
    muted?: boolean;
  }

  export interface LabelProps extends Omit<TextProps, "children"> {
    children: [
      string,
      (props: { id: string; labelledBy: string }) => ReactChildren
    ];
  }

  export type HtmlTag = GetArrayElementType<typeof htmlTags>;
  export type Variant = GetArrayElementType<typeof variants>;
}

const genName = (
  variant:
    | Text.Variant
    | "truncate"
    | "numOfLines"
    | "no-padding"
    | "uppercase"
    | "text-muted"
) => `Text-${variant}`;

const TRUNCATE_CLASS = genName("truncate");
const NO_PADDING_CLASS = genName("no-padding");
const UPPERCASE_CLASS = genName("uppercase");
const TEXT_MUTED_CLASS = genName("text-muted");
const NUM_OF_LINES_VAR = genName("numOfLines");
const SPACING_AFTER_TEXT = "10px";

function headingSize(size: number) {
  return `calc(${pxToRem(size)} + min(2vw, ${size / 2}px))`;
}

export const textStyles = css`
  * {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
  }

  .${genName("h1")} {
    font-size: ${headingSize(45)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h2")} {
    font-size: ${headingSize(38)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h3")} {
    font-size: ${headingSize(32)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h4")} {
    font-size: ${headingSize(27)};
    font-style: normal;
    font-weight: 900;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h5")} {
    font-size: ${headingSize(24)};
    font-style: normal;
    font-weight: 700;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("h6")} {
    font-size: ${headingSize(18)};
    font-style: normal;
    font-weight: 700;
    line-height: 1em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("copy-1")}, .${genName("copy-1")} a,
  ${genName("p")}, p {
    font-size: ${pxToRem(20)};
    font-style: normal;
    font-weight: 400;
    line-height: 1.5em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("link")}, a {
    font-size: ${pxToRem(18)};
    font-style: normal;
    font-weight: 400;
    line-height: ${22 / 18}em;
    text-decoration: none;
    cursor: pointer;

    color: ${color("accent1", 10)};
    ${({ theme }) =>
      theme.darkMode?.(
        `
      color: ${color("accent1", 6)};
    ` ?? ""
      )}

    &:hover {
      text-decoration: underline;
    }
  }
  .${genName("copy-2")}, .${genName("copy-2")} a {
    font-size: ${pxToRem(17)};
    font-style: normal;
    font-weight: 400;
    line-height: ${16 / 14}em;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${genName("p")}, p {
    display: block;
    margin-block-start: 0;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin-bottom: ${SPACING_AFTER_TEXT};
  }
  .${TRUNCATE_CLASS} {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: var(--${NUM_OF_LINES_VAR});
    word-wrap: break-word;
  }
  .${NO_PADDING_CLASS}.${NO_PADDING_CLASS}.${NO_PADDING_CLASS} {
    margin: 0;
    padding: 0;
  }
  .${TEXT_MUTED_CLASS} {
    color: ${color("gray", 9)};
  }
  .${UPPERCASE_CLASS} {
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

function TextElement({ htmlTag = "span", ...props }: Text.TextElementProps) {
  switch (htmlTag) {
    case "h1":
      return <h1 {...props} />;
    case "h2":
      return <h2 {...props} />;
    case "h3":
      return <h3 {...props} />;
    case "h4":
      return <h4 {...props} />;
    case "h5":
      return <h5 {...props} />;
    case "h6":
      return <h6 {...props} />;
    case "p":
      return <p {...props} />;
    case "time":
      return <time {...props} />;
    case "blockquote":
      return <blockquote {...props} />;
    case "label":
      return <label {...props} />;
    case "figcaption":
      return <figcaption {...props} />;
    default:
      return <span {...props} />;
  }
}

export function Text({
  ariaLabel,
  ariaHidden,
  variant = "copy-1",
  numberOfLines,
  style,
  htmlTag,
  htmlFor,
  id,
  className,
  children,
  noPadding,
  muted,
  uppercase,
  ...cssProps
}: Text.TextProps) {
  variant = variantConvertAlias(variant);

  return (
    <TextElement
      id={id}
      htmlFor={htmlFor}
      htmlTag={htmlTag}
      className={cn(className, genName(variant), {
        [TRUNCATE_CLASS]: numberOfLines !== undefined,
        [NO_PADDING_CLASS]: noPadding,
        [UPPERCASE_CLASS]: uppercase,
        [TEXT_MUTED_CLASS]: muted,
      })}
      style={{
        [`--${NUM_OF_LINES_VAR}`]: numberOfLines,
        ...style,
        ...cssProps,
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      {children}
    </TextElement>
  );
}
Text.variants = variants;
Text.htmlTags = htmlTags;

export function Label({
  htmlTag = "label",
  children,
  ...rest
}: Text.LabelProps) {
  const parentId = useComponentId("label");
  const childId = useComponentId("labelledBy");
  return (
    <>
      <Text id={parentId} htmlFor={childId} htmlTag={htmlTag} {...rest}>
        {children[0]}
      </Text>
      {children[1]({ id: childId, labelledBy: parentId })}
    </>
  );
}

/**
 * Some variants are aliases for other variants.
 * This function converts aliases to the actual variant.
 */
function variantConvertAlias(variant: Text.Variant): Text.Variant {
  switch (variant) {
    default:
      return variant;
  }
}
Text.variantConvertAlias = variantConvertAlias;

export default Text;
