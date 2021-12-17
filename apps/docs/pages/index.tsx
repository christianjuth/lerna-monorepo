import type { NextPage } from 'next'
import { useAuth } from '../components/Gun'

const Home: NextPage = () => {
  const { user } = useAuth()

  return (
    <h1>Home</h1>
  )
}

export default Home
