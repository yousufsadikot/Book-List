import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./Pages/BookList";
import BookDescription from "./Pages/BookDescription";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<BookList />}></Route>
          <Route path="/book/:bookId" element={<BookDescription />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
