import { useRouter } from "next/router"
import { useGunItem } from "../../components/Gun"
import { MainGutters } from '@christianjuth/ui'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'
import { useRef, ComponentProps } from 'react'
import { useEffect } from "react";
import { useState } from "react";
import type Quill from 'react-quill'
import type ReactQuillAPI from 'react-quill/lib'
import type Quill2 from 'quill'
import type { RangeStatic } from "quill";

import { diffChars } from 'diff'

function diff(a: string, b: string) {
  const [c1,c2] = diffChars(a, b)
  if (c1?.count === undefined || c2?.count === undefined) {
    return {
      index: 0,
      length: 0
    }
  }
  if (c1.removed || c1.added) {
    return {
      index: 0,
      length: c1.count * (c1.added ? 1 : -1)
    } 
  }
  return {
    index: c1.count,
    length: c2.count * (c2.added ? 1 : -1)
  }
}

interface QuillExtenededProps extends ComponentProps<typeof Quill> {
  forwardedRef: any 
}

const ReactQuill = dynamic<QuillExtenededProps>(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);

function useQuill() {
  const quillRef = useRef<InstanceType<typeof ReactQuillAPI>>();
  const [editor, setEditor] = useState<Quill2 | null>(null)
  const [,setSignal] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      const editor = quillRef.current?.editor
      if (editor) {
        window.clearInterval(id)
        setEditor(editor)
      } else {
        setSignal(i => i+1)
      }
    }, 50)
    return () => {
      window.clearInterval(id)
    }
  }, [])

  return {
    quillRef,
    editor
  }
}

function Doc() {
  const { quillRef, editor } = useQuill()
  
  const router = useRouter()
  const id = router.query.id as string

  const [doc, setDoc] = useGunItem(`doc-${id}`, {
    value: ''
  })

  useEffect(() => {
    if (editor) {
      const emptyRange = { index: 0, length: 0}
      let prevRange: RangeStatic = { ...emptyRange }
      let prevValue = editor.getText()

      editor.on('selection-change', (range, _, source) => {
        if (source === 'user') {
          prevRange.length = range?.length ?? emptyRange.length
        }
        prevRange.index = range?.index ?? emptyRange.index
      })

      editor.on('text-change', (_1,_2,source) => {
        const value = editor.getText()
        const { index, length } = diff(prevValue, value)

        if (value.length + prevRange.length < prevRange.index) {
          prevRange = { ...emptyRange }
        }

        else if (source !== 'user' && index <= prevRange.index) {
          const rangeClone = { ...prevRange }
          setTimeout(() => {
            try {
              prevRange = rangeClone 
              editor.setSelection({
                length: Math.min(prevRange.length, value.length-1),
                index: Math.max(prevRange.index + length, 0)
              })
            } catch(e) {}
          }, 0)
        }

        prevValue = editor.getText()
      })
    } 
  }, [editor])

  return (
    <MainGutters style={{flex: 1}}>
      {doc?.value && (
        <ReactQuill 
          theme="snow" 
          value={doc.value} 
          onChange={(value, _, source) => {
            if (source === 'user') {
              setDoc({ value })
            } 
          }}
          forwardedRef={quillRef}
        />
      )}
    </MainGutters>
  )
}

export default Doc