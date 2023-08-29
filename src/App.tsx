import Auth from "./pages/Auth";
import Todo from "./pages/Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<Todo />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
