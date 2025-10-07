import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import './App.css'

function App() {
  const basename = '/frontend-test-task-axon'

  return (
    <Router basename={basename}>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
