import styled, { createGlobalStyle } from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { Link } from "./Link";
import { MainGutters } from "./MainGutters";
import { Search } from "./Search";
import { Text } from "./Text";
import { color, spacing, zIndex, Theme } from "./Theme";
import { ReactChild, GenericProps } from "./types";
import { InvisibleButton } from "./UtilityStyles";
import { StatefulActionMenu } from "./ActionMenu";
import { Display } from "./Grid";
import { FiMenu } from "react-icons/fi";
import { Avatar } from "./Avatar";
import { elevationStyle } from "./Paper";
import { theme } from "./Theme";
import { cn } from "./utils";

const GlobalStyles = createGlobalStyle<{ $navbarHeight: number }>`
  *[id] {
    ${({ $navbarHeight }) => `scroll-margin-top: ${$navbarHeight}px;`}
  }
`;


export const Items = styled.div<{
  $spacing?: number;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ $spacing }) =>
    $spacing
      ? `
    &&& > *:not(:first-child) {
      margin-left: ${spacing($spacing)};
    }
    &&& {
      .navbar-link + .navbar-link {
        margin-left: 0;
      }      
    }
  `
      : ""}
`;

const Bar = styled(MainGutters)<{
  $themeColor: Theme.ColorName;
  $themeShade: number;
  $elevation: number;
}>`
  border-bottom: 1px solid ${theme.colorPresets.border};
  position: sticky;
  top: 0;
  z-index: ${zIndex("header")};
  backdrop-filter: blur(15px);

  ${({ $themeColor, $themeShade }) => `
    background-color: ${
      $themeColor === "gray"
        ? color($themeColor, 0, 0.9)
        : color($themeColor, $themeShade)
    };
    color: ${
      $themeColor === "gray"
        ? color($themeColor, 0, "text")
        : color($themeColor, $themeShade, "text")
    };

    ${
      $themeColor !== "gray"
        ? `
      border: none;
    `
        : ""
    }
  `}
  ${elevationStyle}
`;

const StyledLink = styled(Button)<{ $themeColor: Theme.ColorName }>`
  &&,
  &&:hover {
    color: unset;
    text-decoration: none;
  }

  ${({ $themeColor }) =>
    $themeColor === "gray"
      ? `
    color: ${color("gray", 0, "text")};
  `
      : `
    color: ${color($themeColor, 15, "text")}};
  `}

  transition: opacity 0.1s;

  :hover {
    opacity: 1;
  }
`;

const CenterItemWrap = styled.div`
  flex: 1;
`;

export declare namespace Navbar {
  export type Props = {
    logo?: ReactChild<string>;
    themeColor?: Theme.ColorName;
    themeShade?: number;
    leftItems?: Item[];
    rightItems?: Item[];
    dark?: boolean;
    defaultButtonVariant?: Button.Variant;
    defaultItemSize?: GenericProps.Size;
    centerItem?: Item;
    elevation?: number;
  };

  export type Item = {
    button?: Button.Props;
    link?: Link.Props;
    input?: Input.Props;
    search?: Search.Props;
    child?: ReactChild;
    avatar?: Avatar.Props;
  };

  export interface ItemProps extends Item {
    themeColor: Theme.ColorName;
    className?: string;
    defaultButtonVariant: Button.Variant;
    defaultItemSize: GenericProps.Size;
  }
}

function Item({
  button,
  link,
  input,
  search,
  avatar,
  child,
  themeColor,
  className,
  defaultButtonVariant,
  defaultItemSize,
}: Navbar.ItemProps) {
  if (avatar) {
    return <Avatar {...avatar} />;
  }

  if (search) {
    return (
      <Search
        themeColor={themeColor}
        size={defaultItemSize}
        variant="transparent"
        {...search}
        className={[
          {
            [className ?? ""]:
              (search.variant ?? "transparent") === "transparent",
          },
          search.className,
        ].join(" ")}
      />
    );
  }

  if (button) {
    return (
      <Button
        variant={defaultButtonVariant}
        themeColor={
          defaultButtonVariant === "transparent" ? "gray" : themeColor
        }
        size={defaultItemSize}
        className={className}
        {...button}
      />
    );
  }

  if (link) {
    return (
      <StyledLink
        href={link.href}
        $themeColor={themeColor}
        className={cn('navbar-link', className)}
        themeColor={themeColor}
        variant="transparent"
        size={defaultItemSize}
      >
        {link.children}
      </StyledLink>
    );
  }

  if (input) {
    return (
      <Input
        themeColor="gray"
        size={defaultItemSize}
        className={className}
        variant="transparent"
        {...input}
      />
    );
  }

  return <>{child}</> ?? null;
}

Navbar.height = getHeight;
function getHeight(size: GenericProps.Size) {
  let height = 55;
  switch (size) {
    case "md":
      height = 70;
      break;
    case "lg":
      height = 80;
  }
  return height;
}

export function Navbar({
  logo,
  themeColor = "gray",
  themeShade = 9,
  leftItems = [],
  rightItems = [],
  dark = false,
  defaultButtonVariant = "outlined",
  defaultItemSize = "sm",
  centerItem,
  elevation = 0,
}: Navbar.Props) {
  const className = dark || themeColor !== "gray" ? "dark-mode" : undefined;

  const navbarHeight = getHeight(defaultItemSize);

  let spacingMultiplier = 2;
  switch (defaultItemSize) {
    case "md":
      spacingMultiplier = 2;
      break;
    case "lg":
      spacingMultiplier = 3;
  }

  return (
    <>
      {/* TODO: find a way to make this scoped */}
      <GlobalStyles $navbarHeight={navbarHeight} />
      <Bar
        $themeColor={themeColor}
        $themeShade={themeShade}
        innerStyle={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          minHeight: navbarHeight,
        }}
        className={dark ? "dark-mode" : undefined}
        $elevation={elevation}
      >
        <Link
          href="/"
          style={{ color: "unset", marginRight: spacing(spacingMultiplier) }}
          className={className}
        >
          {typeof logo === "string" ? (
            <Text variant="h6" noPadding>
              {logo}
            </Text>
          ) : (
            logo
          )}
        </Link>

        <Display xs={false} lg={true} style={{ flex: 1 }}>
          <Items $spacing={spacingMultiplier}>
            {leftItems.map((item, i) => (
              <Item
                key={i}
                {...item}
                themeColor={themeColor}
                className={className}
                defaultButtonVariant={defaultButtonVariant}
                defaultItemSize={defaultItemSize}
              />
            ))}

            <CenterItemWrap>
              {centerItem && (
                <Item
                  {...centerItem}
                  themeColor={themeColor}
                  className={className}
                  defaultButtonVariant={defaultButtonVariant}
                  defaultItemSize={defaultItemSize}
                />
              )}
            </CenterItemWrap>

            {rightItems.map((item, i) => (
              <Item
                key={i}
                {...item}
                themeColor={themeColor}
                className={className}
                defaultButtonVariant={defaultButtonVariant}
                defaultItemSize={defaultItemSize}
              />
            ))}
          </Items>
        </Display>

        <Display xs={true} lg={false} style={{ flex: 1 }}>
          <Items $spacing={spacingMultiplier}>
            <CenterItemWrap>
              {centerItem && (
                <Item
                  {...centerItem}
                  themeColor={themeColor}
                  className={className}
                  defaultButtonVariant={defaultButtonVariant}
                  defaultItemSize={defaultItemSize}
                />
              )}
            </CenterItemWrap>

            <StatefulActionMenu
              align="end"
              trigger={(props) => (
                <InvisibleButton {...props} className={className}>
                  <FiMenu color={color("gray", 15)} size="1.5rem" />
                </InvisibleButton>
              )}
              items={[...leftItems, ...rightItems]}
            />
          </Items>
        </Display>
      </Bar>
    </>
  );
}
