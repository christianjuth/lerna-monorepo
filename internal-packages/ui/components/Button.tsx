import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import styled, { css } from "styled-components";
import { color, roundness, Theme, theme } from "./Theme";
import { GenericProps, DomEvents } from "./types";
import { pxToRem } from "./utils";
import { Animation, animations } from "./Animations";
import { ImSpinner8 } from "react-icons/im";
import { Link } from "./Link";

const BORDER_WIDTH = 1;

type StyleProps = {
  $size: Button.Size;
  $variant?: Button.Variant;
  $themeColor: Button.Color;
  $fullWidth: boolean;
  $uppercase: boolean;
  $disabled?: boolean;
};

const style = css<StyleProps>`
  outline-offset: ${BORDER_WIDTH * 2}px;

  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${roundness(1)};
  padding: 0;
  background: transparent;
  line-height: 1em;
  letter-spacing: 0.06em;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  height: fit-content;
  && {
    border: 1px solid transparent;
    font-style: var(${theme.VARIABLE_NAMES.BUTTON_FONT_STYLE});
  }
  &&,
  &&:hover {
    text-decoration: none;
  }
  ${({ $disabled }) =>
    $disabled
      ? `
    &&&, &&&:hover {
      border-color: ${color("gray", 2)};
      color: ${color("gray", 5)};
      cursor: not-allowed;
    }
  `
      : ""}
  ${({ $uppercase }) =>
    $uppercase
      ? `
    text-transform: uppercase;
  `
      : ""}
  ${({ $fullWidth }) =>
    $fullWidth
      ? `
    width: 100%;
  `
      : ""}
  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return `
          min-height: ${35 - BORDER_WIDTH * 2}px;
          line-height: ${35 - BORDER_WIDTH * 2}px;
          font-size: 1rem;
          padding: ${pxToRem(0, 10)};
        `;
      case "md":
        return `
          min-height: ${42 - BORDER_WIDTH * 2}px;
          line-height: ${42 - BORDER_WIDTH * 2}px;
          font-size: 1.1rem;
          padding: ${pxToRem(0, 15)};
        `;
      case "lg":
        return `
          min-height: ${48 - BORDER_WIDTH * 2}px;
          line-height: ${48 - BORDER_WIDTH * 2}px;
          font-size: 1.3rem;
          padding: ${pxToRem(0, 20)};
        `;
    }
  }}
  ${({ $variant, $themeColor, $disabled, theme }) => {
    $themeColor = $themeColor ?? theme?.button?.defaultThemeColor
    switch ($variant ?? theme?.button?.defaultVariant) {
      case "contained":
        return `
          &&, &&:hover, &&:active {
            border-color: ${
              $themeColor === "gray"
                ? color($themeColor, 15)
                : color($themeColor, 9)
            };
            background-color: ${
              $themeColor === "gray"
                ? color($themeColor, 15)
                : color($themeColor, 9)
            };
            color: ${
              $themeColor === "gray"
                ? color($themeColor, 15, "text")
                : color($themeColor, 9, "text")
            };
          }
          ${
            $disabled
              ? `
            &&, &&:hover {
              background-color: ${color("gray", 2)};
            }
          `
              : ""
          }
        `;
      case "outlined":
        return `
          && {
            border-color: ${
              $themeColor === "gray"
                ? color($themeColor, 15)
                : color($themeColor, 8)
            };
            color: ${
              $themeColor === "gray"
                ? color($themeColor, 15)
                : color($themeColor, 8)
            };
            transition: background-color 0.2s, color 0.2s, border-color 0.2s;
          }
          &&:hover {
            background-color: ${
              $themeColor === "gray"
                ? color($themeColor, 15)
                : color($themeColor, 8)
            };
            color: ${
              $themeColor === "gray"
                ? color($themeColor, 15, "text")
                : color($themeColor, 8, "text")
            };  
          }
        `;
      case "transparent":
        return $themeColor === 'gray' ? `
          && {
            color: ${color("gray", 15)};
          }
          &&:hover {
            background-color: ${color($themeColor, 2, 0.7)};
          } 
        ` : `
          && {
            color: ${color("gray", 15)};
          }
          &&:hover {
            background-color: ${color($themeColor, 3, "transparent-overlay-1")};
          }
        `;
    }
  }}
`;

const StyledButton = styled.button<StyleProps>`
  ${style}
`;
const StyledLink = styled(Link)<StyleProps>`
  ${style}
`;

export declare namespace Button {
  export type Size = GenericProps.Size;
  export type Variant = "contained" | "outlined" | "transparent";
  export type Color = Theme.ColorName;

  export interface Props
    extends DomEvents<HTMLAnchorElement & HTMLButtonElement> {
    children: ReactNode;
    style?: CSSProperties;
    href?: string;
    disabled?: boolean;
    size?: Size;
    htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
    className?: string;
    variant?: Variant;
    themeColor?: Color;
    fullWidth?: boolean;
    uppercase?: boolean;
    tabIndex?: number;
    loading?: boolean;
  }
}

export function Button({
  children,
  style,
  href,
  disabled = false,
  size = "md",
  variant,
  className,
  /**
   * When button is variant transparent, themeColor means
   * the color the button is overlaying rather than the color
   * of the button itself. For this reason, assume themeColor
   * is gray when variant is transparent since gray is the
   * themeColor used for background.
   */
  themeColor = variant === "transparent" ? "gray" : undefined,
  fullWidth = false,
  uppercase = false,
  tabIndex,
  htmlType,
  loading = false,
  ...rest
}: Button.Props) {
  return typeof href === "string" ? (
    <StyledLink
      $disabled={disabled}
      $size={size}
      className={className}
      $variant={variant}
      style={style}
      href={!(disabled && !loading) ? href : undefined}
      $themeColor={themeColor}
      $fullWidth={fullWidth}
      $uppercase={uppercase}
      tabIndex={tabIndex}
      {...(rest as any)}
    >
      {children}

      {loading && (
        <Animation
          animations={[animations.spin]}
          style={{ marginLeft: "0.5ch" }}
        >
          <ImSpinner8 />
        </Animation>
      )}
    </StyledLink>
  ) : (
    <StyledButton
      $disabled={disabled}
      disabled={loading || disabled}
      $size={size}
      className={className}
      $variant={variant}
      style={style}
      $themeColor={themeColor}
      $color={color}
      $fullWidth={fullWidth}
      $uppercase={uppercase}
      type={htmlType}
      tabIndex={tabIndex}
      {...(rest as any)}
    >
      {children}

      {loading && (
        <Animation
          animations={[animations.spin]}
          style={{ marginLeft: "0.6ch" }}
        >
          <ImSpinner8 size="0.9em" />
        </Animation>
      )}
    </StyledButton>
  );
}

export default Button;
