import { Backdrop } from "./Backdrop";
import { Paper } from "./Paper";
import { Input } from "./Input";
import styled from "styled-components";
import { Button } from "./Button";
import { spacing } from "./Theme";
import { Divider } from "./Divider";

const Wrapper = styled(Paper)`
  min-width: 500px;
`;

const Item = styled(Button)`
  justify-content: flex-start;
  margin: ${spacing(1)};
`;

const StyledDivider = styled(Divider)`
  padding: 0;
  margin: 0;
`;

const items: Button.Props[] = [{ children: "Testing" }];

export function CommandPalette() {
  return (
    <Backdrop visible={true}>
      <Wrapper style={{ position: "relative" }} padding={0}>
        <Input hideBorder style={{ margin: spacing(0.5) }} />
        {items.length > 0 && <StyledDivider />}
        {items.map((link) => (
          <Item
            key={link.children as string}
            {...link}
            size="sm"
            themeColor="gray"
            variant="transparent"
          />
        ))}
      </Wrapper>
    </Backdrop>
  );
}
