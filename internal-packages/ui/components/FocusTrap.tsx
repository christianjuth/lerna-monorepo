/**
 * Visual elements on the page (e.g. a modal) controls
 * what the user sees and is allowed to click on, but
 * they can still focus/click items outside of these
 * compoennt using keyboard shortcuts. This component
 * traps focus. It can be used for something like a modal.
 * When the user presses, selectable elements are
 * restricted to what is inside the modal. Closing the
 * modal (via button or esc key) should disable the trap.
 */
 import { forwardRef, useEffect } from "react"
 import { RefObject } from "react"
 import { useRef } from "react"
 import { ReactChildren } from "./types"
 
 declare namespace FocusTrap {
   type TrapConfig = {
     element: HTMLDivElement
     loopFocus: boolean
     returnFocus: boolean
     enableArrowKeys: boolean
   }
 
   interface Props extends Partial<TrapConfig> {
     active: boolean
     children: ReactChildren
   }
 }
 
 function getKeyboardFocusableElements(element: HTMLElement) {
   return Array.from(
     element.querySelectorAll(
       'a[href], button, input, textarea, select, details,[tabindex]:not([tabindex="-1"])'
     )
   ).filter(
     (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
   )
 }
 
 function tryToFocus(element?: HTMLElement | Element | null) {
   if (element && element instanceof HTMLElement) {
     element.focus()
   }
 }
 
 function trapFocus({
   element,
   loopFocus,
   returnFocus,
   enableArrowKeys,
 }: FocusTrap.TrapConfig) {
   const beforeTrapFocus = document.activeElement
   const focusableEls = getKeyboardFocusableElements(element)
   const firstFocusableEl = focusableEls[0]
   const lastFocusableEl = focusableEls[focusableEls.length - 1]
 
   let lastFocusedElement = firstFocusableEl
 
   function captureFocus() {
     const focusedElement = document.activeElement
 
     if (focusedElement === document.body) {
       return
     } else if (!element.contains(focusedElement)) {
       tryToFocus(lastFocusedElement)
     } else {
       lastFocusedElement = document.activeElement as HTMLElement
     }
   }
 
   function focusIndex(index: number) {
     if (index > focusableEls.length - 1) {
       index = 0
     } else if (index < 0) {
       index = focusableEls.length - 1
     }
     tryToFocus(focusableEls[index])
   }
 
   function trap(e: KeyboardEvent) {
     const activeElement = document.activeElement
 
     switch (e.key) {
       case "Tab":
         /* shift + tab */
         if (e.shiftKey && activeElement === firstFocusableEl) {
           loopFocus && tryToFocus(lastFocusableEl)
           e.preventDefault()
         } else {
           /* tab */
           if (activeElement === lastFocusableEl) {
             loopFocus && tryToFocus(firstFocusableEl)
             e.preventDefault()
           }
         }
         return
       case "ArrowDown":
         if (enableArrowKeys) {
           e.preventDefault()
           focusIndex(focusableEls.findIndex((el) => el === activeElement) + 1)
         }
         return
       case "ArrowUp":
         if (enableArrowKeys) {
           e.preventDefault()
           focusIndex(focusableEls.findIndex((el) => el === activeElement) - 1)
         }
         return
     }
   }
 
   element.addEventListener("keydown", trap)
   window.addEventListener("focusin", captureFocus)
   window.addEventListener("click", captureFocus)
   return () => {
     element.removeEventListener("keydown", trap)
     window.removeEventListener("focusin", captureFocus)
     window.removeEventListener("click", captureFocus)
     if (returnFocus && beforeTrapFocus !== document.body) {
       tryToFocus(beforeTrapFocus)
     }
   }
 }
 
 export const FocusTrap = forwardRef<HTMLDivElement, FocusTrap.Props>(
   function FocusTrap(
     {
       active = true,
       loopFocus = true,
       returnFocus = true,
       enableArrowKeys = false,
       children,
     },
     parentRef
   ) {
     const localRef = useRef<HTMLDivElement>(null)
     const ref = (parentRef ?? localRef) as RefObject<HTMLDivElement>
 
     useEffect(() => {
       if (ref.current && active) {
         return trapFocus({
           element: ref.current,
           loopFocus,
           returnFocus,
           enableArrowKeys,
         })
       }
     })
 
     return <div ref={ref}>{children}</div>
   }
 )