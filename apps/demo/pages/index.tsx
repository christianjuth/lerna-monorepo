
import { GetStaticProps } from "next"
import styled from 'styled-components'
import { Page } from '../components/Page'
import { API, getPackages } from '../utils'
import Link from 'next/link'

const Card = styled.a`
  background: transparent;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid var(--divider);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: unset;
  margin-bottom: 10px;
  transition: border-color 0.1s;

  :hover {
    border-color: var(--text);
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
      {packages.map(p => (
        <Link key={p.package.name} href={p.package.name.replace(SCOPE, '')} passHref={true}>
          <Card>
            <span style={{color: 'var(--accent)'}}>{p.package.name}</span>
            <h3>{p.package.description}</h3>
            <i>{p.package.version}</i>
          </Card>
        </Link>
      ))}
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