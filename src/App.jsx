import { Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store';
import Dashboard from './features/dashboard/Dashboard'
import Login from './features/login/Login'
import Registros from './features/registros/Registros'
import Personas from './features/personas/Personas'
// import Auditoria from './features/auditoria/Auditoria'
import Sacramentos from './features/sacramentos/Sacramentos'
import Usuarios from './features/usuarios/Usuarios'
import Reportes from './features/reportes/Reportes'
import Certificados from './features/certificados/Certificados'
import Parroquias from './features/parroquias/parroquias';

export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registros" element={<Registros />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/sacramentos" element={<Sacramentos />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/certificados" element={<Certificados />} />
        <Route path="/parroquias" element={<Parroquias />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Provider>
  )
}
