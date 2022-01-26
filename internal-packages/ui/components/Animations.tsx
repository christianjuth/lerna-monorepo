import { CSSProperties, useRef } from "react";
import styled from "styled-components";
import { useElementIsVisible } from "./hooks";
import { ReactChildren } from "./types";

export declare namespace Animation {
  type Props = {
    duration?: number;
    delay?: number;
    distance?: number;
    loop?: boolean;
    pause?: boolean;
  };

  export type AnimationFn = (p: Props) => string;
}

const animationBase = ({ duration, delay, loop, pause }: Animation.Props) => `
  will-change: auto;
  animation-duration: ${duration ?? 2000}ms;
  animation-delay: ${delay ?? 0}ms;
  ${loop ? "animation-iteration-count: infinite;" : ""}
  animation-fill-mode: forwards; 
  ${pause ? "animation-play-state: paused;" : ""}
`;

const fadeIn = (_: Animation.Props) => `
  animation-name: fade-in;
  animation-timing-function: linear;
  opacity: 0;
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const natualBounce = (props: Animation.Props) => `
  animation-name: natural-bounce;
  animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  @keyframes natural-bounce {
    0%   { transform: scale(1,1)      translateY(0); }
    10%  { transform: scale(1.1,.9)   translateY(0); }
    30%  { transform: scale(.9,1.1)   translateY(-${props.distance ?? 100}px); }
    50%  { transform: scale(1.05,.95) translateY(0); }
    57%  { transform: scale(1,1)      translateY(-${
      (props.distance ?? 100) * 0.05
    }px); }
    64%  { transform: scale(1,1)      translateY(0); }
    100% { transform: scale(1,1)      translateY(0); }
  }
`;

const spin = (_: Animation.Props) => `
  animation-name: spin;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const up = (props: Animation.Props) => `
  animation-name: up;
  animation-timing-function: cubic-bezier(0,1,.6,1);
  transform: translate(0, ${props.distance ?? 20}px);
  @keyframes up {
    from {
      transform: translate(0, ${props.distance ?? 20}px);
    }
    to {
      transform: translate(0,0);
    }
  }
`;

const AnimationDiv = styled.div<{ $css: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $css }) => $css}
`;

export const animations = {
  fadeIn,
  natualBounce,
  spin,
  up,
};

export function Animation({
  animations,
  children,
  trigger = "on-mount",
  config = {},
  style,
}: {
  animations: Animation.AnimationFn[];
  children: ReactChildren;
  trigger?: "on-mount" | "on-visible";
  config?: Animation.Props;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useElementIsVisible(ref, "-15%", true);
  const pause = (trigger === "on-visible" && !isVisible) || config.pause;

  const css = animations.map((fn) => fn({ pause, ...config })).join(" ");

  let animationNames = css
    .match(/animation-name:(\s*([^;])+\s*);/gi)
    ?.map((match) => match.replace(/(animation-name:\s*|;)/gi, ""))
    .join(", ");

  if (animationNames) {
    animationNames = `animation-name: ${animationNames};`;
  }

  let animationTimings = css
    .match(/animation-timing-function:(\s*([^;])+\s*);/gi)
    ?.map((match) => match.replace(/(animation-timing-function:\s*|;)/gi, ""))
    .join(", ");

  if (animationTimings) {
    animationTimings = `animation-timing-function: ${animationTimings};`;
  }

  return (
    <AnimationDiv
      ref={ref}
      style={style}
      $css={`${animationBase({
        pause,
        ...config,
      })} ${css} ${animationNames} ${animationTimings}`}
    >
      {children}
    </AnimationDiv>
  );
}