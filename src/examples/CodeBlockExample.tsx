import React from "react";
import CodeBlock from "../components/CodeBlock";

const CodeBlockExample: React.FC = () => {
  const code = `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from './App';

  ReactDOM.render(<App />, document.getElementById('root'));
  `;

  return (
    <div className="p-4">
      <CodeBlock
        code={code}
        language="javascript"
        lineNumbers={true}
        highlightLines={[2, 3]}
        tooltip="Copy to clipboard"
        collapsible={true}
        defaultCollapsed={false}
        customClass="my-custom-codeblock"
        customButtonClass="my-custom-button"
        customCodeClass="my-custom-code"
        customLineNumberClass="my-custom-line-number"
        customHighlightClass="my-custom-highlight"
        onCopySuccess={() => console.log("Code copied successfully!")}
        onFocus={() => console.log("Code block focused")}
        onBlur={() => console.log("Code block blurred")}
        onKeyDown={(e) => console.log("Key down on code block", e)}
        onMouseEnter={() => console.log("Mouse entered code block")}
        onMouseLeave={() => console.log("Mouse left code block")}
        onAnimationEnd={() => console.log("Animation ended")}
        ariaLabel="Example code block"
      />
    </div>
  );
};

export default CodeBlockExample;
