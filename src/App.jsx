import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Body from './components/Body'
import Dashboard from './pages/Dashboard'
import LeadManagement from './pages/LeadManagement'
import Sales from './pages/Sales'
import Agents from './pages/Agents'
import Settings from './pages/Settings'
import Reports from './pages/Reports'

function App() {

  return (
    <Router basename='/'>
      <Routes>
        <Route path='/' element={<Body/>}>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/leads' element={<LeadManagement/>}></Route>
          <Route path='/sales' element={<Sales/>}></Route>
          <Route path='/agents' element={<Agents/>}></Route>
          <Route path='/reports' element={<Reports/>}></Route>
          <Route path='/settings' element={<Settings/>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
