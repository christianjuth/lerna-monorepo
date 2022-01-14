import { createContext, useCallback, useContext, useState } from "react"
import styled from "styled-components"
import { v4 as uuid } from "uuid"
import { Backdrop } from "./Backdrop"
import { Button } from "./Button"
import { FocusTrap } from './FocusTrap'
import { Paper } from "./Paper"
import { Text } from "./Text"
import { spacing } from "./Theme"
import { ReactChild, ReactChildren } from "./types"

const AlertWrap = styled(Paper)`
  width: 350px;
  max-width: 100%;
  text-align: center;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & > * {
    margin: ${spacing(0, 0.5)};
  }
`

export declare namespace Alert {
  export type Type = "success" | "error" | "info" | "warning" | "pending"

  export interface AlertConfig {
    title: string
    content?: string | ReactChildren
    buttons?: Button.Props[]
    type?: Type
    onClose?: () => any
  }

  export interface AlertState extends AlertConfig {
    id: string
  }
}

function generateAlertState(
  alertConfig: Alert.AlertConfig | Alert.AlertConfig["title"]
): Alert.AlertState {
  const config: Alert.AlertConfig =
    typeof alertConfig === "string" ? { title: alertConfig } : alertConfig
  return {
    type: "info",
    buttons: [{
      children: 'Close',
    }],
    ...config,
    id: uuid(),
  }
}

const Context = createContext<{
  alert: Alert.AlertState | null
  updateAlert: (msg: Alert.AlertConfig | Alert.AlertConfig["title"]) => any
  clearAlert: () => any
}>({
  alert: null,
  updateAlert: () => {},
  clearAlert: () => {},
})

export function AlertProvider({ children }: { children: ReactChild }) {
  const [alert, setAlert] = useState<Alert.AlertState | null>(null)

  const updateAlert = useCallback(
    (alertConfig: Alert.AlertConfig | Alert.AlertConfig["title"]) =>
      setAlert(generateAlertState(alertConfig)),
    []
  )

  const clearAlert = useCallback(() => {
    setAlert(null)
  }, [])
  
  return (
    <Context.Provider
      value={{
        alert,
        updateAlert,
        clearAlert,
      }}
    >
      {children}
      <Backdrop visible={Boolean(alert)} handleClose={clearAlert}>
        {alert && (
          <FocusTrap active>
            <AlertWrap roundness={1}>
              <Text variant="h4">{alert.title}</Text>
              {alert.content && <Text variant="copy-1">{alert.content}</Text>}
              <FlexRow>
                {alert.buttons?.map((btn, i) => (
                  <Button key={i} onClick={clearAlert} size="sm" {...btn} />
                ))}
              </FlexRow>
            </AlertWrap>
          </FocusTrap>
        )}
      </Backdrop>
    </Context.Provider>
  )
}

export function useAlert() {
  const { updateAlert, clearAlert } = useContext(Context)

  const createAlertDispatcherOfType = useCallback(
    (type: Alert.AlertConfig["type"]) => {
      return (
        alertConfig:
          | Omit<Alert.AlertConfig, "type">
          | Alert.AlertConfig["title"]
      ) => {
        updateAlert({
          ...(typeof alertConfig === "string"
            ? { title: alertConfig }
            : alertConfig),
          type,
        })
      }
    },
    [updateAlert]
  )

  return {
    dispatch: updateAlert,
    success: createAlertDispatcherOfType("success"),
    error: createAlertDispatcherOfType("error"),
    info: createAlertDispatcherOfType("info"),
    warning: createAlertDispatcherOfType("warning"),
    pending: createAlertDispatcherOfType("pending"),
    clear: clearAlert,
  }
}

export const Alert = {
  Provider: AlertProvider,
  useAlert,
}