import styles from './Equipes.module.css';
import logo from '../../assets/logo-n.png';
import Button from '../../components/button/Button';
import type { UserResponse } from '../../types/UserResponse';
import { useEffect, useState } from 'react';
import Text from '../../components/text/Text';
import TableContainer from '../../components/table-container/TableContainer';
import Table from '../../components/table/Table';
import type { EquipeResponse } from '../../types/EquipeResponse';
import { apagarEquipe, criarEquipe, editarEquipe, getEquipes } from '../../services/equipeService';
import { getUserDetails } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/input/Input';
import { XIcon } from "lucide-react";
import InputBox from '../../components/input-box/InputBox';
import TextBox from '../../components/text-box/TextBox';
import { alterarNome, deletarUsuario } from '../../services/usuarioService';
import type { UserRequest } from '../../types/UserRequest';
import type { EquipeRequest } from '../../types/EquipeRequest';
import type { Registro } from '../../types/Registro';


export default function Equipes() {
    const [userDetails, setUserDetails] = useState<UserResponse>();
    const [registros, setRegistros] = useState<Registro[]>();
    const [novaEquipe, setNovaEquipe] = useState<string>('');
    const [novoNomeUsuario, setNovoNomeUsuario] = useState<string>('');
    const [novoNomeEquipe, setNovoNomeEquipe] = useState<string>('');
    const [idEquipeEditando, setIdEquipeEditando] = useState<number | string>();
    const [viewSquadBox, setViewSquadBox] = useState<boolean>(false);
    const [viewProfileBox, setViewProfileBox] = useState<boolean>(false);
    const [viewEditBox, setViewEditBox] = useState<boolean>(false);

    const navigate = useNavigate();

    const editarPerfil = async () => {
        let nomeAtualizado: string | null = null;

        if (userDetails && novoNomeUsuario) {
            const novoNomeJson: UserRequest = { username: novoNomeUsuario, email: 'email@gmail.com', password: 'password' }
            const result: UserResponse = await alterarNome(userDetails.id, novoNomeJson);
            nomeAtualizado = result.username;
            setViewProfileBox(false);
        }

        if (nomeAtualizado && userDetails) {
            const usuarioAtualizado: UserResponse = { id: userDetails.id, email: userDetails.email, jwt: userDetails.jwt, username: nomeAtualizado };
            setUserDetails(usuarioAtualizado);
            localStorage.setItem('userDetails', JSON.stringify(usuarioAtualizado));
        }
    }

    const deletarPerfil = async () => {
        if (userDetails) {
            await deletarUsuario(userDetails.id);
            localStorage.removeItem('userDetails');
            navigate('/');
        }
    }

    const getListaEquipes = async (userId: number) => {
        const listaEquipes: EquipeResponse[] = await getEquipes(userId);
        const listaRegistros: Registro[] = listaEquipes.map((e) => { return { identifier: e.squadId, secondIdentifier: null, name: e.squadName, secondValue: e.ownerName, thirdValue: e.membersAmount } });
        setRegistros(listaRegistros);
        console.log(listaRegistros);
    }

    const criarNovaEquipe = async () => {
        console.log('Aqui!')
        if (novaEquipe && userDetails) {
            const equipeResponse: EquipeResponse = await criarEquipe(userDetails.id, novaEquipe);
            const registro: Registro = { identifier: equipeResponse.squadId, secondIdentifier: null, name: equipeResponse.squadName, secondValue: equipeResponse.ownerName, thirdValue: equipeResponse.membersAmount };

            if (registros) {
                registros.push(registro);
                setRegistros(registros);
                setViewSquadBox(false);
                return;
            } else {
                const novaListaRegistros: Registro[] = [registro];
                setRegistros(novaListaRegistros);
                setViewSquadBox(false);
            }


        }
    }

    const editarNomeEquipe = async () => {
        if (registros) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == idEquipeEditando) {
                    if (userDetails) {
                        if (novoNomeEquipe === null || novoNomeEquipe === '') {
                            return;
                        }
                        const dados: EquipeRequest = { id: registros[i].identifier, name: novoNomeEquipe }
                        const equipeEditada: EquipeResponse = await editarEquipe(idEquipeEditando, dados);

                        const listaEquipes: Registro[] = registros.filter((e) => e.identifier !== idEquipeEditando);
                        listaEquipes.push({ identifier: equipeEditada.squadId, secondIdentifier: null, name: equipeEditada.squadName, secondValue: equipeEditada.ownerName, thirdValue: equipeEditada.membersAmount });

                        setRegistros(listaEquipes);
                        setViewEditBox(false);
                        setNovoNomeEquipe('');
                    }
                }
            }
        }
    }

    const showEditBox = (id: number | string) => {
        setViewEditBox(true);
        setIdEquipeEditando(id);
    }

    const deletarEquipe = (id: number | string) => {
        if (registros) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == id) {
                    if (userDetails) {
                        setRegistros(registros.filter((e) => e.identifier !== id));
                        apagarEquipe(userDetails.id, registros[i].identifier);
                    }
                }
            }

        }

    }

    const acessarMembros = async (idEquipe: number) => {
        navigate(`/equipes/${idEquipe}/membros`);
    }

    const desconectar = () => {
        localStorage.removeItem('userDetails');
        navigate('/');
    }

    useEffect(() => {
        const user: UserResponse = getUserDetails();
        if (user) {
            setUserDetails(user);
            getListaEquipes(user.id);
        }
        console.log(user);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button width={200} margin={15} height={45} onClick={() => setViewProfileBox(true)}>VER PERFIL</Button>
                    <Button width={200} margin={15} height={45} onClick={() => setViewSquadBox(true)}>NOVA EQUIPE</Button>
                    <Button width={200} margin={15} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={desconectar}>DESCONECTAR</Button>
                </div>
            </div>


            <div className={styles.principal}>
                <div>
                    <Text size={30}>Bem-vindo, {userDetails?.username}!</Text>
                </div>
                <div>
                    <TableContainer><Table values={registros} onDelete={deletarEquipe} onEdit={showEditBox} onAcessOneArg={acessarMembros} type='equipes' column1='NOME DA EQUIPE' column2='LÍDER DA EQUIPE' column3='QUANTIDADE DE MEMBROS' column4='AÇÕES'></Table></TableContainer>
                </div>
            </div>

            <InputBox view={viewSquadBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>CRIANDO UMA NOVA EQUIPE...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewSquadBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Nome da equipe' value={novaEquipe} onChange={(e) => setNovaEquipe(e.target.value)}></Input>
                    <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={criarNovaEquipe}>CRIAR EQUIPE</Button>
                </div>
            </InputBox>

            <InputBox view={viewEditBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>EDITANDO EQUIPE...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewEditBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Novo nome da equipe' value={novoNomeEquipe} onChange={(e) => setNovoNomeEquipe(e.target.value)}></Input>
                    <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={editarNomeEquipe}>EDITAR NOME</Button>
                </div>
            </InputBox>

            <InputBox view={viewProfileBox} width='55vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>SEU PERFIL DE USUÁRIO.</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewProfileBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width='auto' margin='0px 0px 30px 0px' placeholder={userDetails?.username} value={novoNomeUsuario} onChange={(e) => setNovoNomeUsuario(e.target.value)}></Input>
                    <TextBox margin='0px 0px 30px 0px' value={userDetails?.email} width='auto'></TextBox>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Button width={200} margin='0px 10px 30px 0px' height={45} onClick={editarPerfil}>APLICAR</Button>
                    <Button width={200} color='#EB5151' margin='0px 0px 30px 10px' height={45} onClick={deletarPerfil}>DELETAR PERFIL</Button>
                </div>
            </InputBox>
        </div>
    );
}