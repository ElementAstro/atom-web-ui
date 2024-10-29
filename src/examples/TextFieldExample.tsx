import React, { useState, ChangeEvent } from "react";
import TextField from "../components/TextField";

const TextFieldExample: React.FC = () => {
  const [singleLineValue, setSingleLineValue] = useState("");
  const [multiLineValue, setMultiLineValue] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      setSingleLineValue(e.target.value);
    } else if (e.target instanceof HTMLTextAreaElement) {
      setMultiLineValue(e.target.value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">TextField 示例</h2>

      <div>
        <h3 className="text-xl font-semibold">单行文本框</h3>
        <TextField
          label="单行文本框"
          placeholder="请输入文本"
          value={singleLineValue}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          color="primary"
          helperText="这是一个单行文本框"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold">多行文本框</h3>
        <TextField
          label="多行文本框"
          placeholder="请输入多行文本"
          value={multiLineValue}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          helperText="这是一个多行文本框"
        />
      </div>
    </div>
  );
};

export default TextFieldExample;
