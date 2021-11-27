import ReactMarkdown from 'react-markdown'
import { useReadme } from '../hooks'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useMemo } from 'react'

export function Readme({
  pkg
}: {
  pkg: string
}) {
  let md = useReadme(pkg)

  const markdown = useMemo(
    () => {
      if (md === null) {
        return null
      } else {
        return (
          md
          .replace(new RegExp(`#\\s*(${pkg}|\`${pkg}\`)`, 'ig'), '')
          .replace(/\[demo\](.+)/i, '')
          .replace(/<a.+>\s*demo\s*<\/a\s*>/i, '')
        )
      }
    },
    [md, pkg]
  )

  if (!markdown) {
    return null
  }

  return (
    <ReactMarkdown 
      children={markdown} 
      components={{
        code({node, inline, className, children, ref, ...props}) {
          if (node.tagName === 'code') {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={theme}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return null
        }
      }}
    />
  )
}