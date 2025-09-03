import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Respo from './responsable/responsable.jsx';
import Agent from './agent/agent.jsx';
import Formarriveresop from './agent/formararriverespo.jsx';
import Admin from './admin/admin.jsx';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/agent" element={<Agent />} />
        <Route path="/responsable" element={<Respo/>} />
        <Route path="/formearrive_respo" element={<Formarriveresop/>} />
        <Route path="/admin" element={<Admin/>} />

        

      </Routes>
    </BrowserRouter>
  )
}

export default App
