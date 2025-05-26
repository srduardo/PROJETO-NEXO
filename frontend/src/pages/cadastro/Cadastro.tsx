import { useState } from 'react';
import styles from './Cadastro.module.css';
import logo from '../../assets/logo-nexo.png';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { cadastro } from '../../services/cadastroService';

export default function Cadastro() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirme, setConfirme] = useState('');

    const handleLogin = async () => {
        // Lógica de login
        if (username === null || email === null || password === null || confirme === null) return

        if (password !== confirme) return

        const dados = await cadastro({username, email, password});
        console.log(dados);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={logo} className={styles.logo} />
            </div>

            <div className={styles.line}></div>

            <div className={styles.right}>
                <h1>COMECE AQUI E AGORA!</h1>
                <Input width={400} placeholder='Insira seu nome' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                <Input width={400} placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input width={400} placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                <Input width={400} placeholder='Confirme sua senha' value={confirme} onChange={(e) => setConfirme(e.target.value)}></Input>
                <Button width={200} height={45} color='#EBC351' onClick={handleLogin}>REGISTRAR</Button>
                <Link to='/' className={styles.link}>Conecte-se</Link>
            </div>
        </div>
    );
};