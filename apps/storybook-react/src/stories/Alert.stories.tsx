import { AlertProvider, useAlert } from "@christianjuth/ui";
import { useEffect } from "react";

function TriggerAlert() {
  const { dispatch } = useAlert();

  useEffect(() => {
    dispatch("This is a test")
  }, [dispatch])

  return (
    <button onClick={() => dispatch("This is a test")}>
      Trigger alert
    </button>
  );
}

function AlertExample() {
  return (
    <AlertProvider>
      <TriggerAlert />
    </AlertProvider>
  );
}

export default { component: AlertExample };

export const BasicUsage = {};
