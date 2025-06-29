import styles from './styles/Principal.module.css';
import logo from '../assets/logo-n.png';
import Button from '../components/button/Button';
import type { UserResponse } from '../types/UserResponse';
import { useEffect, useState } from 'react';
import Text from '../components/text/Text';
import TableContainer from '../components/table-container/TableContainer';
import Table from '../components/table/Table';
import type { EquipeResponse } from '../types/EquipeResponse';
import { apagarEquipe, criarEquipe, editarEquipe, getEquipes } from '../services/equipeService';
import { getJwt, getUserDetails } from '../services/loginService';
import { useNavigate } from 'react-router-dom';
import Input from '../components/input/Input';
import { XIcon } from "lucide-react";
import InputBox from '../components/input-box/InputBox';
import TextBox from '../components/text-box/TextBox';
import { alterarNome, deletarUsuario } from '../services/usuarioService';
import type { UserRequest } from '../types/UserRequest';
import type { EquipeRequest } from '../types/EquipeRequest';
import type { Registro } from '../types/Registro';
import Invite from '../components/invite/Invite';
import type { ConviteResponse } from '../types/ConviteResponse';
import { aceitar } from '../services/conviteService';
import { connectWebSocket } from '../services/websocketService';
import type { MembroResponse } from '../types/MembroResponse';
import Warn from '../components/warn/Warn';

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
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [convite, setConvite] = useState<ConviteResponse>();
    const [warnView, setWarnView] = useState<boolean>(false);

    const navigate = useNavigate();

    const temporizarAviso = () => {
        setTimeout(() => {
            setWarnView(false);
        }, 3000)
    }

    const validar = (param: string): boolean => {
        if (param === 'usuario') {
            if (!novoNomeUsuario) {
                setWarnView(true);
                return true;
            }
        }

        if (param === 'criando-equipe') {
            if (novaEquipe === '') {
                setWarnView(true);
                return true;
            }
        }

        if (param === 'editando-equipe') {
            if (novoNomeEquipe === '') {
                setWarnView(true);
                return true;
            }
        }

        return false;
    }

    const editarPerfil = async () => {
        let nomeAtualizado: string | null = null;

        if (validar('usuario')) {
            temporizarAviso();
            return;
        }

        if (userDetails && novoNomeUsuario) {
            const novoNomeJson: UserRequest = { username: novoNomeUsuario, email: 'email@gmail.com', password: 'password' }
            const result: UserResponse = await alterarNome(userDetails.id, novoNomeJson);
            nomeAtualizado = result.username;
            setViewProfileBox(false);
            setNovoNomeUsuario('');
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
        const listaRegistros: Registro[] = listaEquipes.map((e) => { return { identifier: e.squadId, secondIdentifier: e.ownerId, name: e.squadName, secondValue: e.ownerName, thirdValue: e.membersAmount, fourthValue: null } });
        setRegistros(listaRegistros);
        console.log(listaRegistros);
    }

    const criarNovaEquipe = async () => {
        if (validar('criando-equipe')) {
            temporizarAviso();
            return;
        }

        if (novaEquipe && userDetails) {
            const equipeResponse: EquipeResponse = await criarEquipe(userDetails.id, novaEquipe);
            const registro: Registro = { identifier: equipeResponse.squadId, secondIdentifier: equipeResponse.ownerId, name: equipeResponse.squadName, secondValue: equipeResponse.ownerName, thirdValue: equipeResponse.membersAmount, fourthValue: null };

            if (registros) {
                registros.push(registro);
                setRegistros(registros);
                setViewSquadBox(false);
                setNovaEquipe('');
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
                if (registros[i].identifier == idEquipeEditando && userDetails) {
                    if (validar('editando-equipe')) {
                        temporizarAviso();
                        return;
                    }

                    const dados: EquipeRequest = { id: registros[i].identifier, name: novoNomeEquipe }
                    const equipeEditada: EquipeResponse = await editarEquipe(idEquipeEditando, dados);

                    const listaEquipes: Registro[] = registros.filter((e) => e.identifier !== idEquipeEditando);
                    listaEquipes.push({ identifier: equipeEditada.squadId, secondIdentifier: equipeEditada.ownerId, name: equipeEditada.squadName, secondValue: equipeEditada.ownerName, thirdValue: equipeEditada.membersAmount, fourthValue: null });

                    setRegistros(listaEquipes);
                    setViewEditBox(false);
                    setNovoNomeEquipe('');
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
                        apagarEquipe(registros[i].identifier);
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

    const onInvite = (dadosConvite: ConviteResponse) => {
        if (dadosConvite) {
            setConvite(dadosConvite);
            setIsVisible(true);
        }
    }

    const aceitarConvite = () => {
        if (convite?.squadId) {
            aceitar(convite?.squadId);
            setIsVisible(false);
            navigate(`/equipes/${convite.squadId}/membros`);
        }
    }

    const recusarConvite = () => setIsVisible(false);

    const usuarioParaMembro = (): MembroResponse => {
        const usuario: UserResponse = getUserDetails();
        return { memberId: usuario.id, memberName: usuario.username, finishedTasksAmount: 0, tasksAmount: 0, role: 'N/a' };
    }

    useEffect(() => {
        const user: UserResponse = getUserDetails();
        if (user) {
            connectWebSocket(String(getJwt()), onInvite);
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
                    <Button width={200} margin={10} height={45} onClick={() => setViewProfileBox(true)}>VER PERFIL</Button>
                    <Button width={200} margin={10} height={45} onClick={() => setViewSquadBox(true)}>NOVA EQUIPE</Button>
                    <Button width={200} margin={10} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={desconectar}>SAIR</Button>
                </div>
            </div>

            <Invite invite={convite!} isVisible={isVisible} onAccept={aceitarConvite} onRecuse={recusarConvite} />

            <div className={styles.principal}>
                <div>
                    <Text size={30}>Bem-vindo, {userDetails?.username}!</Text>
                </div>
                <div>
                    <TableContainer><Table values={registros} member={usuarioParaMembro()} onDelete={deletarEquipe} onEdit={showEditBox} onAcessOneArg={acessarMembros} type='equipes' column1='NOME DA EQUIPE' column2='LÍDER DA EQUIPE' column3='QUANTIDADE DE MEMBROS' column4='AÇÕES'></Table></TableContainer>
                </div>
            </div>

            <InputBox view={viewSquadBox} width='80vmin' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10 }}>
                    <Text size={'4.4vmin'} color='#EBC351' weight='bold'>CRIANDO UMA NOVA EQUIPE...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: '0.5em', cursor: 'pointer' }} onClick={() => setViewSquadBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Nome da equipe' value={novaEquipe} onChange={(e) => setNovaEquipe(e.target.value)}></Input>
                    <Button width={'23vmin'} margin='0px 0px 30px 0px' height={45} onClick={criarNovaEquipe}>CRIAR</Button>
                </div>
            </InputBox>

            <InputBox view={viewEditBox} width='80vmin' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10 }}>
                    <Text size={'4.4vmin'} color='#EBC351' weight='bold'>EDITANDO EQUIPE...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: '0.5em', cursor: 'pointer' }} onClick={() => setViewEditBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Novo nome da equipe' value={novoNomeEquipe} onChange={(e) => setNovoNomeEquipe(e.target.value)}></Input>
                    <Button width={'23vmin'} margin='0px 0px 30px 0px' height={45} onClick={editarNomeEquipe}>EDITAR</Button>
                </div>
            </InputBox>

            <InputBox view={viewProfileBox} width='80vmin' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10 }}>
                    <Text size={'4.4vmin'} color='#EBC351' weight='bold'>SEU PERFIL DE USUÁRIO.</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: '0.5em', cursor: 'pointer' }} onClick={() => setViewProfileBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Input type='text' width='auto' margin='0px 0px 30px 0px' placeholder={userDetails?.username} value={novoNomeUsuario} onChange={(e) => setNovoNomeUsuario(e.target.value)}></Input>
                    <TextBox margin='0px 0px 30px 0px' value={userDetails?.email} width='auto'></TextBox>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Button width={'35vmin'} margin='0px 10px 30px 0px' height={45} onClick={editarPerfil}>APLICAR</Button>
                    <Button width={'35vmin'} color='#EB5151' margin='0px 0px 30px 10px' height={45} onClick={deletarPerfil}>DELETAR</Button>
                </div>
            </InputBox>

            <Warn type='Nome' view={warnView}/>
        </div>
    );
}