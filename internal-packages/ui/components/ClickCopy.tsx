import { Input } from "./Input";
import { MdContentCopy, MdCheck } from "react-icons/md";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { InvisibleButton } from './UtilityStyles'

const Wrapper = styled(InvisibleButton)`
  width: 100%;
  cursor: pointer;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }

  input {
    cursor: pointer;
  }
`;

function fallbackCopyTextToClipboard(text: string) {
  let textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

export declare namespace ClickCopy {
  type Props = { value: string };
}

export function ClickCopy({ value }: ClickCopy.Props) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const id = window.setTimeout(() => {
        setSuccess(false);
      }, 1000);
      return () => {
        window.clearTimeout(id);
      };
    }
  }, [success]);

  return (
    <Wrapper
      onClick={() => {
        copyTextToClipboard(value);
        setSuccess(true);
      }}
    >
      <Input value={value} readOnly style={{paddingRight: 30}}>
        {success ? (
          <MdCheck size={18} style={{ position: "absolute", right: 10 }} />
        ) : (
          <MdContentCopy size={18} style={{ position: "absolute", right: 10 }} />
        )}
      </Input>
    </Wrapper>
  );
}
