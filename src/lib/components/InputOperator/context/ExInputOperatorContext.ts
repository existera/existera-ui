import { createContext, useContext } from "react";
import { InputOperatorSize } from "../types/ExInputOperatorType";

interface InputOperatorContextValue {
  operator: boolean;
  size: InputOperatorSize;
}

const InputOperatorContext = createContext<InputOperatorContextValue>({
  operator: false,
  size: "md",
});

export const InputOperatorProvider = InputOperatorContext.Provider;

export const useInputOperator = () => {
  return useContext(InputOperatorContext);
};
