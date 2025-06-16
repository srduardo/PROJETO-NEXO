import { Navigate } from "react-router-dom";
import { autenticado } from "../services/loginService";


interface PrivadaProps {
    children: React.ReactNode;
}

export default function Privada({children}: PrivadaProps) {
    return autenticado() ? <>{children}</> : <Navigate to="/"/>
}