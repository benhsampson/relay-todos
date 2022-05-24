import type { SyntheticEvent } from "react";
import React, { useState } from "react";

type Props = {
  onSave: (text: string) => void;
};

const TodoTextInput = ({ onSave }: Props) => {
  const [text, setText] = useState("");

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);

  return (
    <>
      <input onChange={handleChange} value={text} />
      <button onClick={() => onSave(text)}>add</button>
    </>
  );
};

export default TodoTextInput;
