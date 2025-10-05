import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExplorePage from './pages/ExplorePage';
import DesignSystemPage from './pages/DesignSystemPage';
import CreatePage from './pages/CreatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExplorePage />} />
        <Route path="/system/:id" element={<DesignSystemPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/create/:remixId" element={<CreatePage />} />
      </Routes>
    </Router>
  );
}

export default App
