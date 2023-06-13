import React from "react";
import Login from "./pages/Login/Login";
import Navbar from "./components/molecules/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* outros componentes */}
      <Login />
      {/* outros componentes */}
    </div>
  );
}

export default App;
