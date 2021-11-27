import { Package } from '../components/Package'
import { GetStaticProps } from "next"
import { getReadme } from '../utils'

const PKG = '@christianjuth/sudoku-solver'

function SudokuSolver({
  readme
}: {
  readme: string
}) {
  return (
    <Package
      pkg="@christianjuth/sudoku-solver"
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

export default SudokuSolver