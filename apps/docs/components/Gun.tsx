import { useContext, createContext, useMemo, useCallback, useState, useEffect, useRef } from 'react'
import GUN from 'gun'

import { IGunChainReference } from 'gun/types/chain'
import styled from 'styled-components'

export type ReactChild<T = never> = React.ReactNode | null | T
export type ReactChildren<T = never> = ReactChild<T> | ReactChildren<T>[]

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  * {
    margin: 3px 0;
  }
`

const Context = createContext({} as ReturnType<typeof useAuthInternal>)

function useAuthInternal() {
  const gun = useMemo(() => GUN('https://gun-manhattan.herokuapp.com/gun'), [])
  
  const [user, setUser] = useState<null | IGunChainReference<any>>(null)
  const [username, setUsername] = useState('')

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (username) {
      setUser(gun.get(username as never))
      setUsername(username)
    }
  }, [gun])

  const login = useCallback(
    (username: string) => {
      username = username.toLowerCase()
      localStorage.setItem('username', username)
      setUsername(username)
      setUser(gun.get('username' as never))
    },
    [gun]
  )

  const logout = useCallback(
    () => {
      localStorage.removeItem('username')
      setUser(null)
    },
    []
  )

  return {
    login,
    user,
    gun,
    username,
    logout
  }
}

export function useAuth() {
  return useContext(Context)
}

export function useGunItem<T = any>(itemName: string) {
  const { user } = useAuth()
  const [item, setItem] = useState<null | T>(null)

  useEffect(
    () => {
      if (user) {
        let active = true
        const ref = user.get(itemName)

        ref.on(data => {
          if (active) {
            setItem({ ...data })
          }
        })
        return () => {
          active = false
          ref.off()
        }
      }
    }, 
    [itemName, user]
  )

  const update = useCallback(
    (value: T) => {
      if (user) {
        setItem(value)
        user.get(itemName).put(value)
      }
    },
    [user, itemName]
  )

  return [item, update] as const
}

function Login() {
  const [username, setUsername] = useState('')
  const { login } = useAuth()

  return (
    <Form
      onClick={e => {
        e.preventDefault()
        if (username) {
          login(username)
        }
      }}
    >
      <label>Username: </label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <button type='submit'>Sign in</button>
    </Form>
  )
}

export function AuthProvier({ children }: { children: ReactChildren }) {
  const auth = useAuthInternal()
  return (
    <Context.Provider value={auth}>
      {auth.user ? children : <Login/>}
    </Context.Provider>
  )
}