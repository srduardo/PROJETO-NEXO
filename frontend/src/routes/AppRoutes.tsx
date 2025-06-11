import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Cadastro from '../pages/cadastro/Cadastro';
import Privada from '../pages/rota-protegida/Privada';
import Membros from '../pages/membros/Membros';
import Tarefas from '../pages/tarefas/Tarefas';
import Equipes from '../pages/equipes/Equipes';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/equipes" element={
          <Privada>
            <Equipes/>
          </Privada>} 
        />
        <Route path="/equipes/:idEquipe/membros" element={
          <Privada>
            <Membros/>
          </Privada>} 
        />
        <Route path="/equipes/:idEquipe/membros/:idMembro/tarefas" element={
          <Privada>
            <Tarefas/>
          </Privada>} 
        />

      </Routes>
    </BrowserRouter>
  );
}
