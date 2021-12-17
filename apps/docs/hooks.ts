import GUN from 'gun'
import { useMemo } from 'react'

export function useGun() {
  return useMemo(() => GUN(), [])
}

export function useDoc() {

}