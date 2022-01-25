import { useState, useEffect } from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle<{ $scrollBarWidth: number }>`
  body {
    overflow: hidden;
    padding-right: ${({ $scrollBarWidth }) => $scrollBarWidth}px;
  }
`

export function ScrollLock({ active = true }: { active?: boolean }) {
  const [scrollBarWidth, setScrollBarWidth] = useState(0)

  useEffect(() => {
    setScrollBarWidth(window.innerWidth - document.body.offsetWidth)
  }, [active])

  if (!active) {
    return null
  }

  return <GlobalStyles $scrollBarWidth={scrollBarWidth} />
}