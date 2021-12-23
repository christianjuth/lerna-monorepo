import { ReactChildren } from "../../../apps/npm/types"

export function Switch({
  children,
}: {
  children: ReactChildren
}) {
  if (Array.isArray(children)) {
    for (const child of children) {
      if (child) {
        return <>{child}</>
      }
    }
  } else {
    if (children) {
      return <>{children}</>
    }
  }

  return null
}