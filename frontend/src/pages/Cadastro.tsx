import { useState } from 'react';
import styles from './styles/Inicio.module.css';
import logo from '../assets/logo-nexo.png';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar } from '../services/cadastroService';
import type { UserResponse } from '../types/UserResponse';
import Warn from '../components/warn/Warn';

export default function Cadastro() { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirme, setConfirme] = useState('');
    const [warnView, setWarnView] = useState<boolean>(false);

    const navigate = useNavigate();

    const validar = (): boolean => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (username === '' || email === '' || password === '' || confirme === '' || !regexEmail.test(email) || password.length < 6) {
            setWarnView(true);
            return true;
        }

        if (password !== confirme) {
            setWarnView(true);
            return true;
        }

        return false;
    }

    const handleCadastro = async () => {
        if (validar()) {
            setTimeout(() => {
                setWarnView(false);
            }, 3000)
            return;
        }

        const dados: UserResponse | string = await cadastrar({ username, email, password });
        if (dados) navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={logo} className={styles.logo} />
            </div>

            <div className={styles.line}></div>

            <div className={styles.right}>
                <h1>COMECE AQUI E AGORA!</h1>
                <Input type='text' width={'57vmin'} margin={15} placeholder='Insira seu nome' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                <Input type='email' width={'57vmin'} margin={15} placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input type='password' width={'57vmin'} margin={15} placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input type='password' width={'57vmin'} margin={15} placeholder='Confirme sua senha' value={confirme} onChange={(e) => setConfirme(e.target.value)}></Input>
                <Button width={200} margin={15} height={45} color='#EBC351' mouseDownColor='#AD903E' onClick={handleCadastro}>REGISTRAR</Button>
                <Link to='/' className={styles.link}>Conecte-se</Link>
            </div>

            <Warn type='Credenciais' view={warnView} />
        </div>
    );
};