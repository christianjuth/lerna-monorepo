import styled, { css } from "styled-components";
import { Button } from "./Button";
import { Link } from "./Link";
import { Menu, MenuItem, useMenuState } from "./Menu";
import { color } from "./Theme";
import { DomEvents } from "./types";

const itemStyles = css`
  && {
    background-color: ${color("gray", 0)};
    color: ${color("gray", 0, 'text')};
    border-radius: 0;
  }
  &&,
  &&:hover {
    border: none;
  }
  &&:hover {
    background-color: ${color("gray", 2)};
    color: ${color("gray", 2, "text")};
  }
`;

const MenuButton = styled(Button)`
  ${itemStyles}
`;

export declare namespace ActionMenu {
  export interface Item extends DomEvents {
    button?: Button.Props;
    link?: Link.Props;
    // input?: Input.Props;
    // search?: Search.Props;
    // child?: ReactChild;
  }

  interface StatefulActionMenuProps
    extends Pick<Menu.Props, "trigger" | "align"> {
    items: Item[];
  }

  interface Props
    extends StatefulActionMenuProps,
      ReturnType<typeof useMenuState> {}
}

function ActionMenuItem({ link, button }: ActionMenu.Item) {
  if (link) {
    return <MenuButton href={link.href}>{link.children}</MenuButton>;
  }

  if (button) {
    return <MenuButton {...button} />;
  }

  return null;
}

export function ActionMenu({ trigger, items, ...menuState }: ActionMenu.Props) {
  return (
    <Menu trigger={trigger} {...menuState}>
      {items.map((item, i) => {
        const id = i;
        return (
          <MenuItem key={id} id={id}>
            {({ props }) => (
              <ActionMenuItem
                {...item}
                {...props}
                onClick={(e) => {
                  // item.onClick?.(e);
                  menuState.toggle(false);
                }}
              />
            )}
          </MenuItem>
        );
      })}
    </Menu>
  );
}

export function StatefulActionMenu(props: ActionMenu.StatefulActionMenuProps) {
  const menuState = useMenuState();

  return <ActionMenu {...props} {...menuState} />;
}
