import * as React from "react";
import { ReactChildren, DomEvents } from "./types";

export declare namespace Link {
  interface Props extends DomEvents {
    href?: string;
    children?: ReactChildren<string>;
    style?: React.CSSProperties;
    className?: string;
    tabIndex?: number;
    rel?: string;
    role?: string;
    linkRef?: React.RefObject<any>;
    ariaLabel?: string;
  }
}

const CSS_CLASS = "Link";

export function Link({
  href,
  children,
  style,
  className,
  tabIndex,
  rel,
  role,
  onClick,
  linkRef: ref,
  ariaLabel,
  ...rest
}: Link.Props) {
  // const router = useRouter();
  const isInternal = useLinkIsInternal(href);

  if (href === undefined && onClick === undefined) {
    return (
      <div className={className} style={style} tabIndex={tabIndex} ref={ref}>
        {children}
      </div>
    );
  }

  if (href === undefined && onClick !== undefined) {
    return (
      <button
        className={[CSS_CLASS, className].join(" ")}
        style={style}
        tabIndex={tabIndex}
        role={role}
        onClick={onClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }

  const props = {
    href: href ?? "#",
    style,
    className: [CSS_CLASS, className].join(" "),
    tabIndex,
    role,
    ref,
    onClick: onClick
      ? (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          // if (e.defaultPrevented && typeof href !== "undefined") {
          //   router.push(href);
          // }
          onClick(e);
        }
      : undefined,
    "aria-label": ariaLabel,
    ...(!isInternal
      ? {
          rel: `noreferrer nofollow${rel ? " " + rel : ""}`,
          target: "_blank",
        }
      : {}),
    ...rest,
  };

  if (!isInternal) {
    return <a {...props}>{children}</a>;
  }

  return <a {...props}>{children}</a>;
}
/**
 * This function may be useful if you want to
 * use the same logic the Link component uses outside
 *  of a normal link – maybe in a onClick function.
 */
// Link.handleLinkIfInternal = (router: Router, href?: string) => {
//   const isInternal = urls.linkIsInternal(href);

//   if (isInternal && href) {
//     router.push(href);
//     return true;
//   }

//   return false;
// };

function linkIsInternal(href?: string) {
  if (typeof href === "undefined") {
    return false;
  }

  // e.g. "https://docs.google.com/id" -> "docs.google.com"
  const hrefHost = href ? href.match(/(https{0,1}:\/\/|^)([^/]+)/)?.[2] : "";

  let isInternal = false;

  const regex = `^([a-zA-Z0-9_-]\\.|)${location.host}$`;

  if (hrefHost && new RegExp(regex, "i").test(hrefHost)) {
    isInternal = true;
  } else if (typeof href !== "undefined") {
    // match "/[page]" but not "//domain.com"
    isInternal = /^\/([^\/]|$)/.test(href);
  }

  return isInternal;
}

function useLinkIsInternal(href?: string) {
  const [isInternal, setIsInternal] = React.useState(false);

  React.useEffect(() => {
    setIsInternal(linkIsInternal(href));
  }, [href]);

  return isInternal;
}

Link.CSS_CLASS = CSS_CLASS;
export default Link;
