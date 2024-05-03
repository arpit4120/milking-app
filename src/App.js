import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/main/Main';
import MilkingHistory from './components/milkingHistory/MilkingHistory';

function App() {
  return (
    <Router>
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/history" element={<MilkingHistory />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
