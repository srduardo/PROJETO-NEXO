import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import Inicio from '../pages/inicio/Inicio';
import Privada from '../pages/rota-protegida/Privada';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={
          <Privada>
            <Inicio/>
          </Privada>} 
        />

      </Routes>
    </BrowserRouter>
  );
}
