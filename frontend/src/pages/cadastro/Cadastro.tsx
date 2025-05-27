import { useState } from 'react';
import styles from './Cadastro.module.css';
import logo from '../../assets/logo-nexo.png';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrar } from '../../services/cadastroService';
import type { CadastroResponse } from '../../types/CadastroResponse';

export default function Cadastro() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirme, setConfirme] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (username === null || email === null || password === null || confirme === null) return

        if (password !== confirme) return

        const dados: CadastroResponse | string = await cadastrar({username, email, password});
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
                <Input width={400} margin={15} placeholder='Insira seu nome' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                <Input width={400} margin={15} placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input width={400} margin={15} placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input width={400} margin={15} placeholder='Confirme sua senha' value={confirme} onChange={(e) => setConfirme(e.target.value)}></Input>
                <Button width={200} margin={15} height={45} color='#EBC351' mouseDownColor='"#AD903E"' onClick={handleLogin}>REGISTRAR</Button>
                <Link to='/' className={styles.link}>Conecte-se</Link>
            </div>
        </div>
    );
};