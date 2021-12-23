import type { NextPage } from 'next'
import { useAuth } from '../components/Gun'
import { MainGutters } from '@christianjuth/ui'

const Home: NextPage = () => {
  const { user } = useAuth()

  return (
    <MainGutters>
      <h1>Home</h1>
    </MainGutters>
  )
}

export default Home
