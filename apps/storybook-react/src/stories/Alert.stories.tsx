import { AlertProvider, useAlert } from "@christianjuth/ui";
import { useEffect } from "react";

function TriggerAlert() {
  const alrt = useAlert();

  useEffect(() => {
    alrt.dispatch("This is a test")
  }, [alrt.dispatch])

  return (
    <button onClick={() => alrt.dispatch("This is a test")}>
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
