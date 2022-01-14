import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useMemo } from 'react'

export function Readme({
  pkg,
  readme
}: {
  pkg: string
  readme: string
}) {
  const markdown = useMemo(
    () => {
      if (readme === null) {
        return null
      } else {
        return (
          readme
          .replace(new RegExp(`#\\s*(${pkg}|\`${pkg}\`)`, 'ig'), '')
          .replace(/\[demo\](.+)/i, '')
          .replace(/<a.+>\s*demo\s*<\/a\s*>/i, '')
        )
      }
    },
    [readme, pkg]
  )

  if (!markdown) {
    return null
  }

  return (
    <ReactMarkdown 
      components={{
        code({node, inline, className, children, ref, ...props}) {
          if (node.tagName === 'code') {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={theme}
                language={match[1]}
                PreTag="div"
                {...props}
              > 
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return null
        }
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}