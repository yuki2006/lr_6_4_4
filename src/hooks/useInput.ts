import { useState } from "react";

export type UseInputTyp = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  reset: () => void;
};

export function useInput(initialValue: string): UseInputTyp {
  const [value, setValue]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState<string>(initialValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(String(e.target.value));
    },
    reset: () => {
      setValue(initialValue);
    }
  };
}
