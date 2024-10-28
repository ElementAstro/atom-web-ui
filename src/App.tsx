// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ExamplePage from "./pages/ExamplePage";
import SystemInfoPage from "./pages/SystemInfoPage";

const Home: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">主页</h1>
      <ul className="list-disc list-inside">
        <li>
          <Link to="/examples" className="text-blue-500 hover:underline">
            示例页面
          </Link>
        </li>
        <li>
          <Link to="/system-info" className="text-blue-500 hover:underline">
            系统信息页面
          </Link>
        </li>
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/examples" element={<ExamplePage />} />
            <Route path="/system-info" element={<SystemInfoPage />} />
          </Routes>
        </Router>
      </DndProvider>
    </ThemeProvider>
  );
};

export default App;
