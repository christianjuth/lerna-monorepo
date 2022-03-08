import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import styled from "styled-components";

declare namespace ShareButton {
  type Props = {
    contentTitle?: string;
    contentSummary?: string;
  };
}

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;

  & > * {
    margin-right: 10px;
  }
`;

export function ShareButton() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUrl(window.location.href);
  }, [router.asPath]);

  return (
    <FlexRow>
      <TwitterShareButton url={url}>
        <TwitterIcon style={{ borderRadius: "50%" }} size={40} />
      </TwitterShareButton>
      <RedditShareButton url={url}>
        <RedditIcon style={{ borderRadius: "50%" }} size={40} />
      </RedditShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon style={{ borderRadius: "50%" }} size={40} />
      </LinkedinShareButton>
      <FacebookShareButton url={url}>
        <FacebookIcon style={{ borderRadius: "50%" }} size={40} />
      </FacebookShareButton>
    </FlexRow>
  );
}

export default ShareButton;
