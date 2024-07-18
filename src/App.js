import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GetData from './pages/GetData'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetData />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </Router>
  )
}

export default App
