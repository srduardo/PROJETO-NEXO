import { useState } from 'react';
import styles from './styles/Inicio.module.css';
import logo from '../assets/logo-nexo.png';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { logar } from '../services/loginService';
import type { UserResponse } from '../types/UserResponse'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email === null || password === null) return;
        const username: string = "Usuário";
        const dados: UserResponse = await logar({ username, email, password });
        console.log(dados);
        const dadosString: string = JSON.stringify(dados);
        localStorage.setItem('userDetails', dadosString);
        if (dados) navigate('/equipes');
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={logo} className={styles.logo} />
            </div>

            <div className={styles.line}></div>

            <div className={styles.right}>
                <h1>JUNTE-SE A SUA EQUIPE!</h1>
                <Input type='email' width={400} margin={15} placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input type='password' width={400} margin={15} placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input >
                <Button width={200} margin={15} height={45} color='#EBC351' mouseDownColor='#AD903E' onClick={handleLogin}>CONECTAR</Button>
                <Link to={'/cadastro'} className={styles.link}>Cadastre-se</Link>
            </div>
        </div>
    );
};