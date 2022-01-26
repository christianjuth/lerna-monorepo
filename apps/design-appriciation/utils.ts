import { useState, useEffect } from 'react'


export declare namespace API {
  type Package = {
    package: {
      name: string,
      scope: string,
      version: string,
      description: string,
      date: string,
      links: {
        npm: string,
        homepage: string,
        repository: string,
        bugs: string,
      },
      author: {
        name: string,
        email: string,
        username: string,
      },
      publisher: {
        username: string,
        email: string,
      },
      maintainers: [
        {
          username: string,
          email: string,
        }
      ]
    },
    flags: {
      unstable: boolean
    },
    score: {
      final: number,
      detail: {
        quality: number,
        popularity: number,
        maintenance: number,
      }
    },
    searchScore: number,
  }
}


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
  return await res.text()
}

export async function getPackages(search: string) {
  const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${search}/`)
  const json = await res.json()
  return json.objects as API.Package[]
}

