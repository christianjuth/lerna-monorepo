import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { Link } from "./Link";
import { MainGutters } from "./MainGutters";
import { Search } from "./Search";
import { Text } from "./Text";
import { color, spacing, zIndex, Theme } from "./Theme";
import { ReactChild } from "./types";
import { FlexRow, InvisibleButton } from "./UtilityStyles";
import { StatefulActionMenu } from "./ActionMenu";
import { Display } from "./Grid";
import { FiMenu } from "react-icons/fi";

const Bar = styled(MainGutters)<{ $themeColor: Theme.ColorName }>`
  border-bottom: 1px solid ${color("gray", 1)};
  position: sticky;
  top: 0;
  z-index: ${zIndex("header")};

  ${({ $themeColor }) => `
    background-color: ${
      $themeColor === "gray" ? color($themeColor, 0) : color($themeColor, 9)
    };
    color: ${
      $themeColor === "gray"
        ? color($themeColor, 0, "text")
        : color($themeColor, 9, "text")
    };

    ${
      $themeColor !== "gray"
        ? `
      border: none;
    `
        : ""
    }
  `}
`;

const Items = styled(FlexRow)`
  align-items: center;
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
    opacity: 0.5;
    color: ${color("gray", 0, "text")};
  `
      : `
    opacity: 0.7;
    color: ${color($themeColor, 15, "text")}};
  `}

  transition: opacity 0.1s;

  :hover {
    opacity: 1;
  }
`;

export declare namespace Navbar {
  export type Props = {
    logo: ReactChild<string>;
    themeColor?: Theme.ColorName;
    leftItems: Item[];
    rightItems: Item[];
    dark?: boolean;
  };

  export type Item = {
    button?: Button.Props;
    link?: Link.Props;
    input?: Input.Props;
    search?: Search.Props;
    child?: ReactChild;
  };

  export interface ItemProps extends Item {
    themeColor: Theme.ColorName;
    className?: string;
  }
}

function Item({
  button,
  link,
  input,
  search,
  child,
  themeColor,
  className,
}: Navbar.ItemProps) {
  if (search) {
    return (
      <Search
        themeColor={themeColor}
        size="sm"
        {...search}
        className={[className, search.className].join(" ")}
        variant="transparent"
      />
    );
  }

  if (button) {
    return (
      <Button
        variant="outlined"
        themeColor="gray"
        size="sm"
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
        className={className}
        themeColor="gray"
        variant="transparent"
        size="sm"
      >
        {link.children}
      </StyledLink>
    );
  }

  if (input) {
    return (
      <Input
        themeColor="gray"
        size="sm"
        className={className}
        variant="transparent"
        {...input}
      />
    );
  }

  return <>{child}</> ?? null;
}

export function Navbar({
  logo,
  themeColor = "gray",
  leftItems,
  rightItems,
  dark = false,
}: Navbar.Props) {
  const className = dark || themeColor !== "gray" ? "dark-mode" : undefined;

  return (
    <Bar
      $themeColor={themeColor}
      innerStyle={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        minHeight: 55,
      }}
      className={dark ? "dark-mode" : undefined}
    >
      <Link
        href="/"
        style={{ color: "unset", marginRight: spacing(4) }}
        className={className}
      >
        <Text variant="h6" noPadding>
          {logo}
        </Text>
      </Link>

      <Display xs={false} md={true}>
        <Items>
          {leftItems.map((item, i) => (
            <Item
              key={i}
              {...item}
              themeColor={themeColor}
              className={className}
            />
          ))}
        </Items>
      </Display>

      <div style={{ flex: 1 }} />

      <Display xs={false} md={true}>
        <Items $spacing={spacing(2)}>
          {rightItems.map((item, i) => (
            <Item
              key={i}
              {...item}
              themeColor={themeColor}
              className={className}
            />
          ))}
        </Items>
      </Display>

      <Display xs={true} md={false}>
        <StatefulActionMenu
          align="end"
          trigger={(props) => (
            <InvisibleButton {...props} className={className}>
              <FiMenu color={color("gray", 15)} size="1.5rem" />
            </InvisibleButton>
          )}
          items={[...leftItems, ...rightItems]}
        />
      </Display>
    </Bar>
  );
}
