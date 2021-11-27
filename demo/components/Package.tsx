import { useState, ReactElement } from 'react'
import { Divider } from './Divider'
import { Readme } from './Readme'
import { Grid } from './Grid'
import styled from 'styled-components'

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

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;

  * {
    line-height: 1.5em;
  }
`

const Main = styled.main`
  *:first-child {
    margin-top: 0;
  }
`

export function Package({
  pkg,
  demo,
  readme
}: {
  pkg: string,
  demo: ReactElement
  readme: string
}) {
  const [tab, setTab] = useState('demo')

  return (
    <>
      <Grid.Row cols='150px 1fr 150px' spacing={5}>

        {/* Header */}
        <Grid.Col xs={0} md={1} />
        <Grid.Col xs={3} md={1}>
          <Subtitle>{pkg.replace(/\/.+/, '')}/</Subtitle>
          <Title>{pkg.replace(/.+\//, '')}</Title>
          <Divider />
        </Grid.Col>
        <Grid.Col xs={0} md={1} />

        {/* Content */}
        <Grid.Col xs={0} md={1}>
          <Sidebar>
            <button className='link' onClick={() => setTab('demo')}>Demo</button>
            <button className='link' onClick={() => setTab('readme')}>README.md</button>
            <a href={`https://www.npmjs.com/package/${pkg}`}>NPM</a>
          </Sidebar>
        </Grid.Col>

        <Grid.Col xs={3} md={1}>
          <Main>
            {tab === 'demo' && demo}
            {tab === 'readme' && <Readme pkg={pkg} readme={readme} />}
          </Main>
        </Grid.Col>

      </Grid.Row>
    </>
  )

} 