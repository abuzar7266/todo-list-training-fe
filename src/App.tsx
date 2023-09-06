import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoContainer from "containers/todoContainers/todoContainer";
import Auth from "pages/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<TodoContainer />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
