import './App.css';
import './index.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<HomePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
