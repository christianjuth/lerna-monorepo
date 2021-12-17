import { useRouter } from "next/router"
import { useGunItem } from "../../components/Gun"
import { MainGutters, color } from '@christianjuth/ui'
import styled from "styled-components"

const TextArea = styled.textarea`
  display: flex;
  flex: 1;
  background-color: ${color('gray', 0)};
  color: ${color('gray', 15)}
  resize: none;
  padding: 10px;
`

function Doc() {
  const router = useRouter()
  const id = router.query.id as string

  const [doc, setDoc] = useGunItem<{ value: string }>(`doc-${id}`)

  return (
    <MainGutters style={{flex: 1}}>
      <TextArea
        value={doc?.value}
        onChange={e => setDoc({ value: e.target.value })}
      />
    </MainGutters>
  )
}

export default Doc