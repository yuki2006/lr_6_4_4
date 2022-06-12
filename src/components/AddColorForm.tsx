import React from "react";
// import { css } from "@emotion/react";
import { useInput } from "../hooks/useInput";
import { useColors } from "../hooks/useColors"

export function AddColorForm() {
  const titleInput = useInput("");
  const colorInput = useInput("#000000");
  const { addColor } = useColors();

//const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => 
  function handleSubmit (e: React.FormEvent): void {
    e.preventDefault();
    addColor(titleInput.value, colorInput.value);
    titleInput.reset();
    colorInput.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={titleInput.value} onChange={titleInput.onChange} type="text" placeholder="color title..." required />
      <input value={colorInput.value} onChange={colorInput.onChange} type="color" required />
      <button>ADD</button>
    </form>
  )
}
  /*
    <form
      className={css`
        display: flex;
        justify-content: space-around;
        margin: 0.25em;
        button {
          margin: 0.25em;
        }
        input {
          margin: 0.25em;
          &:first-child {
            flex: 1;
          }
        }
      `}
      onSubmit={submit}
    >
  */
