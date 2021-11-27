import { useState, useEffect } from 'react'

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(
      url,
      { signal }
    )
    .then(res => res.text())
    .then(data => {
      setData(data as any)
    })

    return () => {
      controller.abort()
    }
  }, [url])

  return data
}

export function useReadme(pkg: string) {
  return useFetch<string>(`https://unpkg.com/${pkg}/README.md`)
}