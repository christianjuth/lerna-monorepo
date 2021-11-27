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

export async function getReadme(pkg: string) {
  const res = await fetch(`https://unpkg.com/${pkg}/README.md`)
  return res.text()
}