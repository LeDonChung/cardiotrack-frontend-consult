import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Consult from './pages/Consult';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/Consult' element={<Consult/>}>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
