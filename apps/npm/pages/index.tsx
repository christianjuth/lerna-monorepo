
import { GetStaticProps } from "next"
import styled from 'styled-components'
import { Page } from '../components/Page'
import { API, getPackages } from '../utils'
import Link from 'next/link'
import { color, Grid, spacing } from '@christianjuth/ui'

const Card = styled.a`
  background: transparent;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--divider);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: unset;
  transition: border-color 0.1s;

  :hover {
    border-color: ${color('gray', 10)};
    text-decoration: none;
  }
`

const SCOPE = '@christianjuth/'

function Index({
  packages
}: {
  packages: API.Package[]
}) {
  return (
    <Page header={<h1>NPM Packages</h1>}>
      <Grid.Row cols={2} spacing={spacing(2)}>
        {packages.map(p => (
          <Grid.Col key={p.package.name}>
            <Link href={p.package.name.replace(SCOPE, '')} passHref={true}>
              <Card>
                <span style={{color: color('accent1', 4)}}>{p.package.name}</span>
                <h3>{p.package.description}</h3>
                <i>{p.package.version}</i>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid.Row>
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let packages: API.Package[] = []

  try {
    packages = await getPackages(SCOPE) 
  } catch(e) {}

  return {
    props: {
      packages
    },
    revalidate: 5 * 60,
  }
}

export default Index