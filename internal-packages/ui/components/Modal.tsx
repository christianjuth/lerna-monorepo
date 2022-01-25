import { CSSProperties, useEffect, useState } from "react";
import { use100vh } from "react-div-100vh";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { Backdrop } from "./Backdrop";
import { Button } from "./Button";
import { FocusTrap } from "./FocusTrap";
import { useBreakPoint } from "./Grid/context";
import { ScrollLock } from "./ScrollLock";
import { Text } from "./Text";
import { theme } from "./Theme";
import { Paper } from "./Paper";
import { GenericProps, ReactChildren } from "./types";

const MOBILE_PADDING = "20px";

const Container = styled(Paper)<{
  $isMobile: boolean;
  $mobileHeight: number;
  $baseWidth: number;
  $fullscreenMobile: boolean;
}>`
  border-radius: ${theme.roundness(1)};
  display: flex;
  flex-direction: column;
  width: 100%;
  ${({ $baseWidth }) => `max-width: ${$baseWidth}px;`}
  ${({ $mobileHeight }) =>
    `max-height: calc(${$mobileHeight}px - ${MOBILE_PADDING} * 2);`}
  margin: 0 ${MOBILE_PADDING};
  position: relative;
  overflow: hidden;
  ${({ $isMobile, $mobileHeight, $fullscreenMobile }) =>
    $isMobile
      ? `
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    
    ${
      $fullscreenMobile
        ? `
        height: ${$mobileHeight}px;
        min-height: ${$mobileHeight}px;
        margin: 0;
      `
        : ""
    }
  `
      : ""}
`;

const ButtomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${theme.spacing(2)};
  border-top: 1px solid ${theme.color("gray", 2)};
  background-color: ${theme.color("gray", 1)};
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
`;

const MainContent = styled.div`
  padding: ${theme.spacing(3)};
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Unbutton = styled.button`
  background: transparent;
  padding: ${theme.spacing(1)};
  margin: 0;
  border: none;
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const Header = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: ${theme.spacing(5)};
`;

const TitleBar = styled.div<{ $overContent: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(2)};
  border-bottom: 1px solid ${theme.color("gray", 2)};
  width: 100%;
  ${({ $overContent }) =>
    $overContent
      ? `
    position: absolute;
    border-bottom: none;
  `
      : ""}
`;

const Title = styled(Text)`
  display: flex;
  line-height: 1em;
`;

// export function useUrlModalStateWithItemSpecifiable<
//   T extends string | boolean
// >({ key, expectedValue }: { key: string; expectedValue?: string }) {
//   const { replace, query } = useRouter()
//   const open = expectedValue
//     ? query[key] === expectedValue
//     : Boolean(query[key])

//   const setOpen = useCallback(
//     (val: T) => {
//       const queryClone = { ...query }
//       if (val) {
//         queryClone[key] =
//           expectedValue ?? (typeof val === "string" ? val : "true")
//       } else {
//         delete queryClone[key]
//       }
//       replace({
//         query: {
//           ...queryClone,
//         },
//       })
//     },
//     [replace, query, key, expectedValue]
//   )

//   return {
//     value: query[key] ? String(query[key]) : undefined,
//     open,
//     setOpen,
//   }
// }

export function useModalState(
  id?: string,
  showInUrl = Boolean(id)
): {
  open: boolean;
  setOpen: (val: boolean) => any;
} {
  const [open, setOpen] = useState(false);

  // const urlState = useUrlModalStateWithItemSpecifiable<boolean>({
  //   key: "modal",
  //   expectedValue: id,
  // })

  // return showInUrl
  //   ? {
  //       open: urlState.open,
  //       setOpen: urlState.setOpen,
  //     }
  //   : {
  //       open,
  //       setOpen,
  //     }

  return {
    open,
    setOpen,
  };
}

export declare namespace Modal {
  interface Props extends ReturnType<typeof useModalState> {
    children: ReactChildren;
    title?: string;
    buttons?: Button.Props[];
    size?: GenericProps.Size;
    header?: ReactChildren<string>;
    fullScreenMobile?: boolean;
    pageTitle?: string;
  }
}

export function Modal({
  children,
  open,
  setOpen,
  title,
  buttons,
  size = "md",
  header,
  fullScreenMobile = true,
  pageTitle = title,
}: Modal.Props) {
  const mobileHeight = use100vh() ?? 0;
  const isMobile = !useBreakPoint("sm");

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [setOpen]);

  let desktopWidth = 650;
  switch (size) {
    case "lg":
      desktopWidth = 800;
      break;
    case "sm":
      desktopWidth = 500;
  }

  return (
    <>
      {/* {open && pageTitle && (
        <Head>
          <title>{SEO.formatTitle(pageTitle)}</title>
        </Head>
      )} */}

      {open && <ScrollLock />}

      <FocusTrap
        active={open}
        // TODO: fix the underying issue where it removes
        // focus form input on every keystroke
        returnFocus={false}
      >
        <Backdrop
          visible={open}
          handleClose={() => setOpen(false)}
          // className={className}
        >
          <Container
            $fullscreenMobile={fullScreenMobile}
            $isMobile={isMobile}
            $mobileHeight={mobileHeight}
            $baseWidth={desktopWidth}
            padding={0}
          >
            <TitleBar $overContent={!title && Boolean(header)}>
              <Title variant="copy-1" noPadding>
                {title}
              </Title>
              <Unbutton onClick={() => setOpen(false)}>
                <IoMdClose
                  size={25}
                  color={theme.colorPresets.textMuted}
                />
              </Unbutton>
            </TitleBar>

            {header}

            <MainContent>{children}</MainContent>

            {buttons && (
              <ButtomBar>
                {buttons?.map((b, i) => (
                  <Button
                    key={typeof b.children === "string" ? b.children : i}
                    size="sm"
                    style={{
                      marginLeft: theme.spacing(2),
                    }}
                    {...b}
                  />
                ))}
              </ButtomBar>
            )}
          </Container>
        </Backdrop>
      </FocusTrap>
    </>
  );
}
