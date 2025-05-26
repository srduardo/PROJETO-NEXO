import { useState } from 'react';
import styles from './Login.module.css';
import logo from '../../assets/logo-nexo.png';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';
import { login } from '../../services/loginService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (email === null || password === null) return
        const username: string = "Usuário";
        const dados = await login({username, email, password})
        console.log(dados);
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src={logo} className={styles.logo} />
            </div>

            <div className={styles.line}></div>

            <div className={styles.right}>
                <h1>JUNTE-SE A SUA EQUIPE!</h1>
                <Input width={400} placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                <Input width={400} placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}></Input >
                <Button width={200} height={45} color='#EBC351' onClick={handleLogin}>CONECTAR</Button>
                <Link to={'/cadastro'} className={styles.link}>Cadastre-se</Link>
            </div>
        </div>
    );
};