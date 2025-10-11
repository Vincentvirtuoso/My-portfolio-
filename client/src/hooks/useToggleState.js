import { useState } from "react";

export default function useToggleState(initialState = false) {
  const [state, setState] = useState(initialState);

  const toggle = (newState) => {
    setState((prev) => (typeof newState === "boolean" ? newState : !prev));
  };

  return { state, toggle, setState };
}
