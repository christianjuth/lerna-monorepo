import {
  Children,
  Key,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabTitle = styled.button<{ active: boolean }>`
  cursor: pointer;
  padding: 0;
  border-radius: 0;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 1rem;
  line-height: 1.3em;
  font-weight: 400;
  color: white;
  background-color: #272a36;
  padding: 8px 12px;
  margin-right: 5px;
  opacity: 0.5;

  ${({ active }) =>
    active
      ? `
    opacity: 1;
  `
      : ""}
`;

export declare namespace Tabs {
  type Props = {
    children: ReactElement<PaneProps> | ReactElement<PaneProps>[];
  };

  type PaneProps = {
    children?: ReactElement | ReactElement[];
    hidden?: boolean;
    key?: string;
    title: string;
    id: string;
  };
}

export function Tabs({ children }: Tabs.Props) {
  const [activeId, setActiveId] = useState<Key | string>("");
  const childrenArr = useMemo(
    () => Children.toArray(children) as ReactElement<Tabs.PaneProps>[],
    [children]
  );

  useEffect(() => {
    const id = childrenArr[0]?.props.id;
    if (activeId === "" && id) {
      setActiveId(id);
    }
  }, [activeId, childrenArr]);

  return (
    <>
      <Header>
        {childrenArr.map((child) => {
          const id = child.props.id;
          const title = child.props.title;
          const hidden = child.props.hidden;
          return hidden ? null : (
            <TabTitle
              key={id}
              active={id === activeId}
              onClick={() => {
                if (id) {
                  setActiveId(id);
                }
              }}
            >
              {title}
            </TabTitle>
          );
        })}
      </Header>
      {childrenArr.find((child) => child.props.id === activeId)}
    </>
  );
}

export function TabPane({ children }: Tabs.PaneProps) {
  return <>{children}</>;
}
