import { createContext, useContext } from "react";
import type { State } from "../../../types/Types";
import { InputOperatorSize } from "../types/ExInputOperatorType";

interface InputOperatorContextValue {
  operator: boolean;
  disabled: boolean;
  state: State;
  size: InputOperatorSize;
}

const InputOperatorContext = createContext<InputOperatorContextValue>({
  operator: false,
  disabled: false,
  state: "default",
  size: "md",
});

export const InputOperatorProvider = InputOperatorContext.Provider;

export const useInputOperator = () => {
  return useContext(InputOperatorContext);
};
