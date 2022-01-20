import { Menu, MenuItem, useMenuState, spacing, color } from "@christianjuth/ui";
import { Meta } from "@storybook/react/types-6-0";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Link = styled.a<{ $active: boolean }>`
  padding: ${spacing(1.5)};
  color: unset;
  text-decoration: none;

  ${({ $active }) =>
    $active
      ? `
    background-color: ${color("gray", 2)};
  `
      : ""}
`;

const MENU_ITEMS = {
  Google: "//google.com",
  Apple: "//apple.com",
};

function MenuExample() {
  const menuState = useMenuState();
  return (
    <Container>
      <Menu
        {...menuState}
        trigger={(props) => <button {...props}>Menu</button>}
      >
        {Object.entries(MENU_ITEMS).map(([name, link]) => (
          <MenuItem id={name} key={name}>
            {({ props, active }) => (
              <Link {...props} $active={active} href={link}>
                {name}
              </Link>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

const meta: Meta = { component: MenuExample, title: "Atoms/Menu" };
export default meta;

export const BasicUsage = {};
