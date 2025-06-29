import styles from './styles/Principal.module.css';
import logo from '../assets/logo-n.png';
import Button from '../components/button/Button';
import Text from '../components/text/Text';
import TableContainer from '../components/table-container/TableContainer';
import Table from '../components/table/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputBox from '../components/input-box/InputBox';
import Input from '../components/input/Input';
import { XIcon } from 'lucide-react';
import type { TarefaRequest } from '../types/TarefaRequest';
import { apagarTarefa, atualizarTarefa, criarTarefa, getTarefas } from '../services/tarefaService';
import type { TarefaResponse } from '../types/TarefaResponse';
import type { Registro } from '../types/Registro';
import type { MembroResponse } from '../types/MembroResponse';
import { getMembro } from '../services/membroService';
import { getJwt, getUserDetails } from '../services/loginService';
import { getLider } from '../services/equipeService';
import Warn from '../components/warn/Warn';
import type { ConviteResponse } from '../types/ConviteResponse';
import { aceitar } from '../services/conviteService';
import { connectWebSocket } from '../services/websocketService';
import Invite from '../components/invite/Invite';

export default function Tarefas() {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [membro, setMembro] = useState<MembroResponse>();
    const [lider, setLider] = useState<MembroResponse>();
    const [donoTarefas, setDonoTarefas] = useState<boolean>();
    const [nomeTarefa, setNomeTarefa] = useState<string>('');
    const [descricaoTarefa, setDescricaoTarefa] = useState<string>('');
    const [viewTaskBox, setViewTaskBox] = useState<boolean>(false);
    const [viewEditBox, setViewEditBox] = useState<boolean>(false);
    const [atualizarStatus, setAtualizarStatus] = useState<boolean>(true);
    const [idTarefaEditando, setIdTarefaEditando] = useState<number>();
    const [warnView, setWarnView] = useState<boolean>(false);
    const [descricaoLonga, setDescricaoLonga] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [convite, setConvite] = useState<ConviteResponse>();

    const { idMembro, idEquipe } = useParams();
    const navigate = useNavigate();

    const temporizarAviso = () => {
        setTimeout(() => {
            setWarnView(false);
        }, 3000)
    }

    const validar = (): boolean => {
        if (descricaoTarefa.length > 300) {
            setDescricaoLonga(true);
            setWarnView(true);
            return true;
        } else {
            setDescricaoLonga(false);
        }

        if (nomeTarefa === '' || descricaoTarefa === '') {
            setWarnView(true);
            return true;
        }

        return false;
    }

    const criarNovaTarefa = async () => {
        if (registros.length >= 10) return;

        if (validar()) {
            temporizarAviso();
            return;
        }

        const tarefa: TarefaRequest = { title: nomeTarefa, description: descricaoTarefa, status: 'PENDENTE' };
        const tarefaCriada: TarefaResponse = await criarTarefa(Number(idMembro), Number(idEquipe), tarefa);
        const registro: Registro = { identifier: tarefaCriada.id, secondIdentifier: Number(idEquipe), name: tarefaCriada.title, secondValue: tarefaCriada.description, thirdValue: tarefaCriada.status, fourthValue: null };

        if (registros) {
            setRegistros([...registros, registro]);
            setViewTaskBox(false);
            setNomeTarefa('');
            setDescricaoTarefa('');
            return;
        } else {
            const novaListaRegistros: Registro[] = [registro];
            setRegistros(novaListaRegistros);
            setViewTaskBox(false);
            setNomeTarefa('');
            setDescricaoTarefa('');
        }

    }

    const deletarTarefa = async (idTarefa: string | number) => {
        if (registros) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == idTarefa) {
                    setRegistros(registros.filter((e) => e.identifier !== idTarefa));
                    apagarTarefa(Number(idTarefa));
                }
            }
        } else { return }
    }

    const mudarStatus = async (idTarefa: string | number) => {
        if (registros) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == idTarefa) {
                    let tarefaAtualizada: TarefaResponse | null = null;
                    if (registros[i].thirdValue === 'PENDENTE') {
                        const tarefa: TarefaRequest = { title: String(registros[i].name), description: String(registros[i].secondValue), status: 'CONCLUÍDO' };
                        tarefaAtualizada = await atualizarTarefa(Number(idTarefa), tarefa);
                    } else {
                        const tarefa: TarefaRequest = { title: String(registros[i].name), description: String(registros[i].secondValue), status: 'PENDENTE' };
                        tarefaAtualizada = await atualizarTarefa(Number(idTarefa), tarefa);
                    }
                    if (tarefaAtualizada) {
                        const novosRegistros: Registro[] = registros.map(t => t.identifier === Number(idTarefa) ? { ...t, title: tarefaAtualizada.title, description: tarefaAtualizada.description, status: tarefaAtualizada.status } : t);
                        setRegistros(novosRegistros);
                    }
                }
            }
        }
        setAtualizarStatus(true);
    }

    const editarTarefa = async () => {
        if (validar()) {
            temporizarAviso();
            return;
        }

        if (registros) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == idTarefaEditando) {
                    const tarefa: TarefaRequest = { title: nomeTarefa, description: descricaoTarefa, status: String(registros[i].thirdValue) };
                    const tarefaAtualizada: TarefaResponse = await atualizarTarefa(Number(idTarefaEditando), tarefa);

                    const registro: Registro = { identifier: tarefaAtualizada.id, secondIdentifier: Number(idEquipe), name: tarefaAtualizada.title, secondValue: tarefaAtualizada.description, thirdValue: tarefaAtualizada.status, fourthValue: null };
                    registros.splice(i, 1, registro);
                    const novos: Registro[] = registros;
                    setRegistros(novos);

                    setNomeTarefa('');
                    setDescricaoTarefa('');
                    setViewEditBox(false);
                }
            }
        } else {
            return;
        }
    }

    const showEditBox = (idTarefa: string | number) => {
        setViewEditBox(true);
        setIdTarefaEditando(Number(idTarefa));
    }

    const voltar = () => {
        setRegistros([]);
        navigate(`/equipes/${idEquipe}/membros`);
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

    useEffect(() => {
        if (idEquipe && idMembro) {
            const getDados = async () => {
                const tarefas: TarefaResponse[] = await getTarefas(Number(idMembro), Number(idEquipe));
                const listaRegistros: Registro[] = tarefas.map((t) => { return { identifier: t.id, secondIdentifier: Number(idMembro), name: t.title, secondValue: t.description, thirdValue: t.status, fourthValue: null } });
                setRegistros(listaRegistros);

                const membroAtual: MembroResponse = await getMembro(Number(idEquipe), Number(idMembro));
                setMembro(membroAtual);

                const liderAtual: MembroResponse = await getLider(Number(idEquipe));
                setLider(liderAtual);

                const perm: boolean = membroAtual?.memberId === getUserDetails().id || liderAtual?.memberId === getUserDetails().id;
                setDonoTarefas(perm);

                connectWebSocket(String(getJwt()), onInvite);
            }

            getDados();
            setAtualizarStatus(false);
        }
    }, [atualizarStatus])

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>

                <div className={styles.buttonContainer}>
                    {(membro && getUserDetails().id && membro?.memberId == getUserDetails().id) || getUserDetails().id === lider?.memberId ?
                        <Button width={200} margin={15} height={45} onClick={() => setViewTaskBox(true)}>NOVA TAREFA</Button>
                        :
                        <></>
                    }
                    <Button width={200} margin={15} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={voltar}>VOLTAR</Button>
                </div>
            </div>

            <Invite invite={convite!} isVisible={isVisible} onAccept={aceitarConvite} onRecuse={recusarConvite} />

            <div className={styles.principal}>
                <div>
                    <Text size={30}>{membro?.memberName}</Text>
                </div>
                <div>
                    <TableContainer><Table type='tarefas' member={membro} isTasksOwner={donoTarefas} values={registros} onChange={mudarStatus} onDelete={deletarTarefa} onEdit={showEditBox} column1='TAREFA' column2='DESCRIÇÃO' column3='STATUS' column4='AÇÕES'></Table></TableContainer>
                </div>
            </div>

            <InputBox view={viewTaskBox} width='80vmin' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10 }}>
                    <Text size={'4.4vmin'} color='#EBC351' weight='bold'>CRIANDO UMA NOVA TAREFA...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: '0.5vmin', cursor: 'pointer' }} onClick={() => setViewTaskBox(false)}><XIcon /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Nome da tarefa' value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)}></Input>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Descrição da tarefa' value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)}></Input>
                        <Button width={'23vmin'} margin='0px 0px 30px 0px' height={45} onClick={criarNovaTarefa}>CRIAR</Button>
                    </div>
                </div>
            </InputBox>

            <InputBox view={viewEditBox} width='80vmin' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 10, marginLeft: 10 }}>
                    <Text size={'4.4vmin'} color='#EBC351' weight='bold'>EDITANDO TAREFA...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: '0.5em', cursor: 'pointer' }} onClick={() => setViewEditBox(false)}><XIcon /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 10, marginLeft: 10, marginTop: 15 }}>
                    <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Novo nome da tarefa' value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)}></Input>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input type='text' width={'50vmin'} margin='0px 0px 30px 0px' placeholder='Nova descrição da tarefa' value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)}></Input>
                        <Button width={'23vmin'} margin='0px 0px 30px 0px' height={45} onClick={editarTarefa}>EDITAR</Button>
                    </div>
                </div>
            </InputBox>

            <Warn type='Dados' view={warnView} differentCondition={descricaoLonga} descriptionLength={descricaoTarefa.length} />
        </div>
    );
}