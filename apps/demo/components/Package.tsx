import { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Page } from './Page'
import { Readme } from './Readme'
import { ReactChildren } from '../types'
import { useRouter } from 'next/router'
import { Switch } from './Switch'
import Link from 'next/link' 

const Subtitle = styled.span`
  && {
    margin: 0;
    font-style: italic;
  }
`

const Title = styled.h1`
  && {
    margin: 0 0 5px;
  }
`

export function Package({
  pkg,
  demo,
  readme
}: {
  pkg: string,
  demo: ReactChildren
  readme: string
}) {
  const router = useRouter()
  const { selectedTab } = router.query
  const [tab, setTab] = useState<string>()

  useEffect(() => {
    if (tab === undefined && typeof selectedTab === 'string') {
      setTab(selectedTab)
    }
  }, [tab, selectedTab])

  useEffect(() => {
    if (tab !== undefined) {
      router.replace(
        {
          query: {
            selectedTab: tab
          }
        }, 
        undefined, 
        { shallow: true }
      )
    }
  }, [tab])

  return (
    <Page 
      header={(
        <>
          <Subtitle>{pkg.replace(/\/.+/, '')}/</Subtitle>
          <Title>{pkg.replace(/.+\//, '')}</Title>
        </>
      )}
      sidebar={(
        <>
          <button className='link' onClick={() => setTab('demo')}>Demo</button>
          <button className='link' onClick={() => setTab('readme')}>README.md</button>
          <a href={`https://www.npmjs.com/package/${pkg}`}>NPM</a>
          <Link href='/'>
            <a>All packages</a>
          </Link>
        </>
      )}
    >
      <Switch>
        {tab === 'readme' && <Readme pkg={pkg} readme={readme} />}
        {demo}
      </Switch>
    </Page>
  )
} 