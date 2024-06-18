import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './components/AdminPage/AdminPage';
import ParentsPage from './components/ParentsPage/ParentsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/admin" element={<AdminPage/>} />
          <Route path="/parents" element={<ParentsPage/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App