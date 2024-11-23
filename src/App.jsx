import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizDashboard from './components/QuizDashboard';
import QuizTest from './components/QuizTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizDashboard />} />
        <Route path="/test/:id" element={<QuizTest />} />
      </Routes>
    </Router>
  );
}

export default App;
