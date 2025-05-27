import styles from './Inicio.module.css';
import logo from '../../assets/logo-n.png';
import Button from '../../components/button/Button';
import type { LoginResponse } from '../../types/LoginResponse';
import { useEffect, useState } from 'react';
import Text from '../../components/text/Text';
import TableContainer from '../../components/table-container/TableContainer';
import Table from '../../components/table/Table';
import type { EquipeResponse } from '../../types/EquipeResponse';
import { apagarEquipe, criarEquipe, getEquipes } from '../../services/equipeService';
import { getUserDetails } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { XIcon } from "lucide-react";
import InputBox from '../../components/input-box/InputBox';
import TextBox from '../../components/text-box/TextBox';
import { alterarNome } from '../../services/usuarioService';


export default function Inicio() {
    const [userDetails, setUserDetails] = useState<LoginResponse>();
    const [equipes, setEquipes] = useState<EquipeResponse[]>();
    const [nomeNovaEquipe, setNomeNovaEquipe] = useState<string>('');
    const [novoNomeUsuario, setNovoNomeUsuario] = useState<string>('');
    const [viewSquadBox, setViewSquadBox] = useState<boolean>(false);
    const [viewPerfilBox, setViewPerfilBox] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePerfil = async () => {
        let nomeAtualizado: string | null = null;
        
        if (userDetails && novoNomeUsuario) {
            const result: LoginResponse| string = await alterarNome(userDetails.id, novoNomeUsuario);
            nomeAtualizado = JSON.stringify(result);
            setViewPerfilBox(false);
        }

        if (nomeAtualizado && userDetails) {
            const usuarioAtualizado: LoginResponse = {id: userDetails.id, email: userDetails.email, token: userDetails.token, username: nomeAtualizado};
            setUserDetails(usuarioAtualizado);
        }
    }

    const handleDeletarPerfil = () => {

    }

    const handleNovaEquipe = async () => {
        console.log('Aqui!')
        if (nomeNovaEquipe && userDetails) {
            const equipeResponse: EquipeResponse = await criarEquipe(userDetails.id, nomeNovaEquipe);

            if (equipes) {
                equipes.push(equipeResponse);
                setEquipes(equipes);
                setViewSquadBox(false);
                return
            } else {
                const novaListaEquipes: EquipeResponse[] = [equipeResponse];
                setEquipes(novaListaEquipes);
                setViewSquadBox(false);
            }


        }
    }

    const handleDesconectar = () => {
        localStorage.removeItem('userDetails');
        navigate('/');
    }

    const handleDelete = (id: number) => {
        console.log("Vou deletar...")
        if (equipes) {
            console.log('Quase lá')
            for (let i = 0; i < equipes.length; i++) {
                console.log('conferindo...')
                if (equipes[i].squadId == id) {
                    console.log(equipes[i].squadId, id);
                    if (userDetails) {
                        setEquipes(equipes.filter((e) => e.squadId !== id));
                        apagarEquipe(userDetails.id, equipes[i].squadId);
                        console.log('Deletei!!')
                    }
                }
            }

        }

    };

    const handleEdit = (id: number) => {
        if (equipes) alert(`Editar equipe: ${equipes[id].squadName}`);
    };

    const handleEquipe = async () => {

    }

    useEffect(() => {
        const user: LoginResponse | undefined = getUserDetails();
        if (user) {
            setUserDetails(user);
            getListaEquipes(user.id);
        }
        console.log(user);
    }, []);

    const getListaEquipes = async (userId: number) => {
        const listaEquipes: EquipeResponse[] = await getEquipes(userId);
        setEquipes(listaEquipes);
        console.log(listaEquipes);
    }

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button width={200} margin={15} height={45} onClick={() => setViewPerfilBox(true)}>VER PERFIL</Button>
                    <Button width={200} margin={15} height={45} onClick={() => setViewSquadBox(true)}>NOVA EQUIPE</Button>
                    <Button width={200} margin={15} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={handleDesconectar}>DESCONECTAR</Button>
                </div>
            </div>


            <div className={styles.principal}>
                <div>
                    <Text size={30}>Bem-vindo, {userDetails?.username}!</Text>
                </div>
                <div>
                    <TableContainer><Table equipes={equipes} onDelete={handleDelete} onEdit={handleEdit} onClick={handleEquipe}></Table></TableContainer>
                </div>
            </div>

            <InputBox view={viewSquadBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>CRIANDO UMA NOVA EQUIPE...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewSquadBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input width={500} margin='0px 0px 30px 0px' placeholder='Nome da equipe' value={nomeNovaEquipe} onChange={(e) => setNomeNovaEquipe(e.target.value)}></Input>
                    <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={handleNovaEquipe}>CRIAR EQUIPE</Button>
                </div>
            </InputBox>

            <InputBox view={viewPerfilBox} width='55    vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>SEU PERFIL DE USUÁRIO.</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewPerfilBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input width='auto' margin='0px 0px 30px 0px' placeholder={userDetails?.username} value={novoNomeUsuario} onChange={(e) => setNovoNomeUsuario(e.target.value)}></Input>
                    <TextBox margin='0px 0px 30px 0px' value={userDetails?.email} width='auto'></TextBox>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Button width={200} margin='0px 10px 30px 0px' height={45} onClick={handlePerfil}>APLICAR</Button>
                    <Button width={200} color='#EB5151' margin='0px 0px 30px 10px' height={45} onClick={handleDeletarPerfil}>DELETAR PERFIL</Button>
                </div>
            </InputBox>
        </div>
    );
}