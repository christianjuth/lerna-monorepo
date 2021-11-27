import { Package } from '../components/Package'
import { GetStaticProps } from "next"
import { getReadme } from '../utils'

const PKG = '@christianjuth/minimax'

function Minimax({
  readme
}: {
  readme: string
}) {
  return (
    <Package
      pkg="@christianjuth/minimax" 
      readme={readme}
      demo={(
        <>
        </>
      )}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let readme: string | null = null

  try {
    readme = await getReadme(PKG)
  } catch(e) {}

  return {
    props: {
      readme
    },
    revalidate: 5 * 60,
  }
}

export default Minimax