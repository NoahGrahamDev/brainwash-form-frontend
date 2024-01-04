import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FormSubmitted from './FormSubmitted';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/submitted" element={<FormSubmitted />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
