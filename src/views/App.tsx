import React from "react";
import UrlShortener from "./components/UrlShortener.tsx";

const App: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <UrlShortener />
    </div>
  );
};

export default App;
