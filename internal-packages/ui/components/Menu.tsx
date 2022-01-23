import {
  Children,
  createContext,
  Dispatch,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  ComponentProps,
} from "react";
import styled, { CSSProperties } from "styled-components";
import { zIndex, spacing } from "./Theme";
import { Paper } from "./Paper";
import { Divider } from "./Divider";
import { v4 as uuid } from "uuid";

function useComponentId(prefix: string) {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuid());
  }, []);

  return `${prefix}-${id}`;
}

// See https://www.24a11y.com/2019/select-your-poison/
function genTriggerAriaProps({
  uuid,
  open,
  activeId,
}: ReturnType<typeof useMenuState>) {
  return {
    // Container
    role: "combobox",
    "aria-owns": uuid,
    "aria-expanded": open,
    "aria-haspopup": "listbox",
    // Control
    "aria-autocomplete": "none",
    "aria-controls": uuid,
    "aria-activedescendant": `${uuid}-${activeId}`,
    title: "toggle menu",
  } as const;
}

export declare namespace Menu {
  type Id = string | number;
  type ActiveId = Id | null;
  type SetActiveId = Dispatch<SetStateAction<ActiveId>>;
  type PopupPlacement = "above" | "below";

  type ItemProps = {
    children: (state: {
      active: boolean;
      setActiveId: Menu.SetActiveId;
      props: {
        onMouseOver: () => void;
        onFocus: () => void;
        id: string;
        role: string;
      };
      ref: any;
    }) => ReactNode;
    id: Menu.Id;
  };

  interface TriggerProps
    extends ReturnType<typeof useMenuTriggerEvents>,
      ReturnType<typeof genTriggerAriaProps> {}

  type MenuChild =
    | ReactElement<Menu.ItemProps>
    | ReactElement<ComponentProps<typeof Divider>>
    | null;

  interface Props {
    children: MenuChild | MenuChild[];
    trigger: (props: TriggerProps) => ReactNode;
    popupPlacement?: PopupPlacement;
    align?: "start" | "end";
    overflow?: CSSProperties["overflow"];
    popupStyle?: CSSProperties;
  }

  interface ControlledMenuProps
    extends Props,
      ReturnType<typeof useMenuState> {}
}

const MenuContainer = styled.div`
  position: relative;
`;

const MenuPopup = styled(Paper)<{ popupPlacement: Menu.PopupPlacement }>`
  position: absolute;
  min-width: 100%;
  z-index: ${zIndex("header", 100)};
  &&& * {
    scroll-margin-top: 0;
    scroll-snap-margin-top: 0;
  }
  ${({ popupPlacement }) =>
    popupPlacement === "below"
      ? `
    top: calc(100% + ${spacing(1)});
  `
      : `
    top: ${spacing(-1)};
    transform: translate(0, -100%);
  `}
`;

const OptionsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Context = createContext<{
  activeId: Menu.ActiveId;
  setActiveId: Menu.SetActiveId;
  open: boolean;
  uuid: string;
}>({
  activeId: null,
  setActiveId: () => {},
  open: false,
  uuid: "",
});

export function useMenuState() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<Menu.ActiveId>(null);
  const uuid = useComponentId("menu");

  const toggle = useCallback((value?: boolean) => {
    setOpen((v) => value ?? !v);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (container && open) {
      function handleClick(e: MouseEvent) {
        const shouldClose = !container?.contains(e.target as any);
        shouldClose && setOpen(false);
      }

      function handleKey(e: KeyboardEvent) {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
        } else if (e.key === "Tab") {
          setOpen(false);
        }
      }

      window.addEventListener("click", handleClick);
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("click", handleClick);
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [open]);

  return { open, toggle, containerRef, activeId, setActiveId, uuid } as const;
}

function useMenuTriggerEvents(menuState: ReturnType<typeof useMenuState>) {
  const { open, toggle, containerRef } = menuState;
  const container = containerRef.current;

  return useMemo<{
    onKeyDown: KeyboardEventHandler<any>;
    onClick: MouseEventHandler<any>;
    onBlur: FocusEventHandler<any>;
  }>(
    () => ({
      onKeyDown: (e) => {
        const hotKeys = ["ArrowUp", "ArrowDown", "Home", "End"];
        const tagName = (e.target as HTMLElement).tagName;
        if (!open && e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          toggle(true);
        } else if (!open && tagName === "INPUT" && e.key?.length === 1) {
          toggle(true);
        } else if (!open && hotKeys.includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();
          toggle(true);
        }
      },
      onClick: () => {
        toggle();
      },
      onBlur: (e) => {
        if (!container?.contains(e.relatedTarget ?? e.target)) {
          toggle(false);
        }
      },
    }),
    [open, toggle, container]
  );
}

function MenuItems({
  children,
  ...menuState
}: Omit<Menu.ControlledMenuProps, "trigger">) {
  const { open, activeId, setActiveId } = menuState;
  // Helps performance but could be
  // outdated if children have changed
  const selectedIndexRef = useRef(-1);

  const childrenArr = Children.toArray(
    children
  ) as ReactElement<Menu.ItemProps>[];

  const shiftSelection = useCallback(
    (shift: number) =>
      setActiveId((id) => {
        const oldIndex = selectedIndexRef.current;
        let index = -1;
        if (childrenArr[oldIndex]?.props.id === id) {
          // Try and find the old element in constant time
          index = oldIndex;
        } else {
          // Perform an O(n) lookup if constant time fails
          index = childrenArr.findIndex((c) => c.props.id === id);
        }
        if (index === -1) {
          // Default to first element if nothing found
          selectedIndexRef.current = 0;
          return childrenArr[0]?.props.id ?? null;
        } else {
          // Shift index looping front -> back and back -> front
          index = (index + shift + childrenArr.length) % childrenArr.length;
          selectedIndexRef.current = index;
          // Skip over dividers
          while (!childrenArr[index]?.props.id) {
            index += shift < 0 ? -1 : 1;
          }
          return childrenArr[index]?.props.id ?? null;
        }
      }),
    [childrenArr, setActiveId]
  );

  useEffect(() => {
    setActiveId((id) => {
      const oldIndex = selectedIndexRef.current;
      let index = -1;
      if (childrenArr[oldIndex]?.props.id === id) {
        // Try and find the old element in constant time
        index = oldIndex;
      } else {
        // Perform an O(n) lookup if constant time fails
        index = childrenArr.findIndex((c) => c.props.id === id);
      }
      return index === -1 ? childrenArr[0]?.props.id : id;
    });
  }, [childrenArr, setActiveId]);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      switch (e.key) {
        // Implement keyboard shortcuts as per this documentation
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role#keyboard_interactions
        case "ArrowUp":
          e.preventDefault();
          shiftSelection(-1);
          return;
        case "ArrowDown":
          e.preventDefault();
          shiftSelection(1);
          return;
        case "Home":
          e.preventDefault();
          const first = childrenArr[0]?.props.id;
          first && setActiveId(first);
          return;
        case "End":
          e.preventDefault();
          const last = childrenArr.slice(-1)[0]?.props.id;
          last && setActiveId(last);
          return;
      }
    }
    if (open) {
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [open, activeId, shiftSelection, setActiveId, childrenArr]);

  return <>{childrenArr}</>;
}

export function ControlledMenu({
  children,
  popupPlacement = "below",
  trigger,
  align = "start",
  overflow = "auto",
  popupStyle,
  ...menuState
}: Menu.ControlledMenuProps) {
  const { open, containerRef, activeId, setActiveId, uuid } = menuState;
  const triggerEvents = useMenuTriggerEvents(menuState);
  const triggerProps = genTriggerAriaProps(menuState);
  const optionsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = optionsWrapRef.current;
    if (element && open) {
      element.scrollIntoView({ block: "nearest" });
    }
  }, [open, containerRef]);

  return (
    <Context.Provider value={{ activeId, setActiveId, open, uuid }}>
      <div style={{ display: "flex" }}>
        <MenuContainer ref={containerRef}>
          {trigger({ ...triggerEvents, ...triggerProps })}
          <MenuPopup
            popupPlacement={popupPlacement}
            padding={0}
            elevation={8}
            style={{
              display: open ? undefined : "none",
              right: align === "end" ? 0 : undefined,
              overflow,
              maxHeight: overflow !== "visible" ? 300 : undefined,
              ...popupStyle,
            }}
          >
            <OptionsWrap
              id={uuid}
              role="listbox"
              title="options"
              style={{ width: "100%" }}
              ref={optionsWrapRef}
            >
              <MenuItems {...menuState}>{children}</MenuItems>
            </OptionsWrap>
          </MenuPopup>
        </MenuContainer>
      </div>
    </Context.Provider>
  );
}

export function MenuItem({ children, id }: Menu.ItemProps) {
  const { setActiveId, activeId, open, uuid } = useContext(Context);
  const active = activeId === id;
  const ref = useRef<HTMLElement>(null);

  const props = {
    onMouseOver: () => {
      setActiveId(id);
    },
    onFocus: () => {
      setActiveId(id);
    },
    // See https://www.24a11y.com/2019/select-your-poison/
    id: `${uuid}-${id}`,
    role: "option",
  };

  useEffect(() => {
    const elm = ref.current;

    if (active && open && elm) {
      elm.scrollIntoView({ block: "nearest" });

      function handleKeyPress(e: KeyboardEvent) {
        if (e.key === "Enter") {
          e.preventDefault();
          elm?.click();
        }
      }
      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [active, open]);

  return <>{children({ active, setActiveId, props, ref })}</>;
}

export function Menu(props: Menu.Props) {
  const menuState = useMenuState();
  return <ControlledMenu {...menuState} {...props} />;
}

export function MenuDivider() {
  return <Divider />;
}
