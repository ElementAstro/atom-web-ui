import React from "react";
import Stack from "../components/Stack";

const StackExample: React.FC = () => {
  return (
    <div>
      <h1>Stack 组件示例</h1>
      <Stack
        direction="row"
        spacing={2}
        divider={<span>|</span>}
        alignItems="center"
        justifyContent="space-between"
        wrap="wrap"
        sx={{ backgroundColor: "#f0f0f0", padding: "1rem" }}
      >
        <div style={{ backgroundColor: "#ff0000", padding: "1rem" }}>
          Item 1
        </div>
        <div style={{ backgroundColor: "#00ff00", padding: "1rem" }}>
          Item 2
        </div>
        <div style={{ backgroundColor: "#0000ff", padding: "1rem" }}>
          Item 3
        </div>
      </Stack>
    </div>
  );
};

export default StackExample;
