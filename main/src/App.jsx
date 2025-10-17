import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Respo from './responsable/responsable.jsx';
import Agent from './agent/agent.jsx';
import Admin from './admin/admin.jsx';
import PageNotFound from './PageNotFound.jsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/responsable" element={<Respo/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<PageNotFound />} />


        

      </Routes>
    </BrowserRouter>
  )
}

export default App
