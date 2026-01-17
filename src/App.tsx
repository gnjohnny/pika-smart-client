import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Welcome to the App!</div>} />
    </Routes>
  );
};

export default App;
