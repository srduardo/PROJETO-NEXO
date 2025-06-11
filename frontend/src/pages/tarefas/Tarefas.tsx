import styles from './Tarefas.module.css';
import logo from '../../assets/logo-n.png';
import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import TableContainer from '../../components/table-container/TableContainer';
import Table from '../../components/table/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputBox from '../../components/input-box/InputBox';
import Input from '../../components/input/Input';
import { XIcon } from 'lucide-react';
import type { TarefaRequest } from '../../types/TarefaRequest';
import { apagarTarefa, atualizarTarefa, criarTarefa, getTarefas } from '../../services/tarefaService';
import type { TarefaResponse } from '../../types/TarefaResponse';
import type { Registro } from '../../types/Registro';
import { pegarUsuario } from '../../services/usuarioService';
import type { UserResponse } from '../../types/UserResponse';
// import type { Registro } from '../../types/Registro';
// import type { MembroResponse } from '../../types/MembroResponse';
// import { getMembros } from '../../services/membroService';
// import type { EquipeResponse } from '../../types/EquipeResponse';
// import { getEquipe } from '../../services/equipeService';

export default function Tarefas() {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [membro, setMembro] = useState<UserResponse>();
    const [nomeTarefa, setNomeTarefa] = useState<string>('');
    const [descricaoTarefa, setDescricaoTarefa] = useState<string>('');
    const [viewTaskBox, setViewTaskBox] = useState<boolean>(false);
    const [viewEditBox, setViewEditBox] = useState<boolean>(false);
    const [atualizar, setAtualizar] = useState<boolean>(true);
    const [idTarefaEditando, setIdTarefaEditando] = useState<number>();

    const { idMembro, idEquipe } = useParams();
    const navigate = useNavigate();

    const criarNovaTarefa = async () => {
        if (registros.length >= 10) return;

        if (nomeTarefa && descricaoTarefa) {
            const tarefa: TarefaRequest = { title: nomeTarefa, description: descricaoTarefa, status: 'PENDENTE' };
            const tarefaCriada: TarefaResponse = await criarTarefa(Number(idMembro), Number(idEquipe), tarefa);
            const registro: Registro = { identifier: tarefaCriada.id, secondIdentifier: Number(idEquipe), name: tarefaCriada.title, secondValue: tarefaCriada.description, thirdValue: tarefaCriada.status };
            if (registros) {
                registros.push(registro);
                setRegistros(registros);
                setViewTaskBox(false);
                setAtualizar(true);
                setNomeTarefa(' ');
                setDescricaoTarefa(' ');
                return;
            } else {
                const novaListaRegistros: Registro[] = [registro];
                setRegistros(novaListaRegistros);
                setViewTaskBox(false);
                setNomeTarefa(' ');
                setDescricaoTarefa(' ');
            }
            setAtualizar(true);
        } else {
            return;
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
        }
        setAtualizar(true);
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
                        const registro: Registro = { identifier: tarefaAtualizada.id, secondIdentifier: Number(idEquipe), name: tarefaAtualizada.title, secondValue: tarefaAtualizada.description, thirdValue: tarefaAtualizada.status };
                        registros.splice(i, 1, registro);
                        const novos: Registro[] = registros;
                        setRegistros(novos);
                    }
                }
            }
        }
        setAtualizar(true);
    }

    const editarTarefa = async () => {
        if (registros && nomeTarefa && descricaoTarefa) {
            for (let i = 0; i < registros.length; i++) {
                if (registros[i].identifier == idTarefaEditando) {
                    const tarefa: TarefaRequest = { title: nomeTarefa, description: descricaoTarefa, status: String(registros[i].thirdValue) };
                    const tarefaAtualizada: TarefaResponse = await atualizarTarefa(Number(idTarefaEditando), tarefa);

                    const registro: Registro = { identifier: tarefaAtualizada.id, secondIdentifier: Number(idEquipe), name: tarefaAtualizada.title, secondValue: tarefaAtualizada.description, thirdValue: tarefaAtualizada.status };
                    registros.splice(i, 1, registro);
                    const novos: Registro[] = registros;
                    setRegistros(novos);

                    setNomeTarefa('');
                    setDescricaoTarefa('');
                    setViewEditBox(false);
                }
            }
            setAtualizar(true);
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

    const getListaTarefas = async () => {
        if (atualizar) {
            const tarefas: TarefaResponse[] = await getTarefas(Number(idMembro), Number(idEquipe));
            const listaRegistros: Registro[] = tarefas.map((t) => { return { identifier: t.id, secondIdentifier: Number(idMembro), name: t.title, secondValue: t.description, thirdValue: t.status } });
            setRegistros(listaRegistros);
            setAtualizar(false);
            console.log('aa');
        }
    }

    const getUsuario = async (idMembro: number) => {
        if (atualizar) {
            const usuario: UserResponse = await pegarUsuario(Number(idMembro));
            setMembro(usuario);
            setAtualizar(false);
            console.log('aa');
        }
    }

    useEffect(() => {
        if (idEquipe) {
            getListaTarefas();
            getUsuario(Number(idMembro));
        }
    }, [registros && atualizar])

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button width={200} margin={15} height={45} onClick={() => setViewTaskBox(true)}>NOVA TAREFA</Button>
                    <Button width={200} margin={15} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={voltar}>VOLTAR</Button>
                </div>
            </div>

            <div className={styles.principal}>
                <div>
                    <Text size={30}>{membro?.username}</Text>
                </div>
                <div>
                    <TableContainer><Table type='tarefas' values={registros} onChange={mudarStatus} onDelete={deletarTarefa} onEdit={showEditBox} column1='TAREFA' column2='DESCRIÇÃO' column3='STATUS' column4='AÇÕES'></Table></TableContainer>
                </div>
            </div>

            <InputBox view={viewTaskBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>CRIANDO UMA NOVA TAREFA...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewTaskBox(false)}><XIcon /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Nome da tarefa' value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)}></Input>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Descrição da tarefa' value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)}></Input>
                        <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={criarNovaTarefa}>CRIAR TAREFA</Button>
                    </div>
                </div>
            </InputBox>

            <InputBox view={viewEditBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>EDITANDO TAREFA...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewEditBox(false)}><XIcon /></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Novo nome da tarefa' value={nomeTarefa} onChange={(e) => setNomeTarefa(e.target.value)}></Input>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Nova descrição da tarefa' value={descricaoTarefa} onChange={(e) => setDescricaoTarefa(e.target.value)}></Input>
                        <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={editarTarefa}>EDITAR TAREFA</Button>
                    </div>
                </div>
            </InputBox>
        </div>
    );
}