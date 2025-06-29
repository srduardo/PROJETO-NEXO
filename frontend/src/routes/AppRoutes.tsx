import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Privada from '../pages/Privada';
import Membros from '../pages/Membros';
import Tarefas from '../pages/Tarefas';
import Equipes from '../pages/Equipes';

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
