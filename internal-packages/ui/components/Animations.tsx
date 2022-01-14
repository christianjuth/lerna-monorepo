import styled from "styled-components"

type Props = {
  duration?: number
  delay?: number
  distance?: number
  loop?: boolean
}

const DEFAULT_PROPS: Props = {
  duration: 2000,
  delay: 0,
}

function animationProperties(props: Props) {
  props = {
    ...DEFAULT_PROPS,
    ...props,
  }

  return `
    animation-duration: ${props.duration}ms;
    animation-delay: ${props.delay}ms;
    ${props.loop ? "animation-iteration-count: infinite;" : ""}
    animation-fill-mode: forwards;
  `
}

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Spin = styled(Center)`
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
  ${animationProperties}
`

const FadeIn = styled(Center)`
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
  ${animationProperties}
`

const NaturalBounce = styled(Center)`
  animation-name: natural-bounce;
  animation-timing-function: cubic-bezier(0.28, 0.84, 0.42, 1);
  ${({ distance }) => `
    @keyframes natural-bounce {
      0%   { transform: scale(1,1)      translateY(0); }
      10%  { transform: scale(1.1,.9)   translateY(0); }
      30%  { transform: scale(.9,1.1)   translateY(-${distance ?? 100}px); }
      50%  { transform: scale(1.05,.95) translateY(0); }
      57%  { transform: scale(1,1)      translateY(-${
        (distance ?? 100) * 0.05
      }px); }
      64%  { transform: scale(1,1)      translateY(0); }
      100% { transform: scale(1,1)      translateY(0); }
    }
  `}
  ${animationProperties}
`

export const Animations = {
  Spin,
  FadeIn,
  NaturalBounce,
}