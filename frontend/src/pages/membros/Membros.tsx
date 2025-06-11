import styles from './Membros.module.css';
import logo from '../../assets/logo-n.png';
import Button from '../../components/button/Button';
import Text from '../../components/text/Text';
import TableContainer from '../../components/table-container/TableContainer';
import Table from '../../components/table/Table';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Registro } from '../../types/Registro';
import type { MembroResponse } from '../../types/MembroResponse';
import { getMembros } from '../../services/membroService';
import type { EquipeResponse } from '../../types/EquipeResponse';
import { getEquipe } from '../../services/equipeService';
import InputBox from '../../components/input-box/InputBox';
import Input from '../../components/input/Input';
import { XIcon } from 'lucide-react';
import { aceitar, convidar } from '../../services/conviteService';
import { connectWebSocket } from '../../services/websocketService';
import { getJwt } from '../../services/loginService';
import type { ConviteResponse } from '../../types/ConviteResponse';
import Invite from '../../components/invite/Invite';

export default function Membros() {
    const [registros, setRegistros] = useState<Registro[]>();
    const [equipe, setEquipe] = useState<EquipeResponse>();
    const [viewInviteBox, setViewInviteBox] = useState<boolean>(false);
    const [emailMembro, setEmailMembro] = useState<string>('');
    const [convite, setConvite] = useState<ConviteResponse>();
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const { idEquipe } = useParams();
    const navigate = useNavigate();

    const enviarConvite = async () => {
        if (!emailMembro) return;

        convidar(Number(idEquipe), emailMembro);
        setViewInviteBox(false);
        console.log('Convite enviado!');
    }

    const voltar = () => {
        navigate('/equipes')
    }

    const removerMembro = () => {

    }

    const showInviteBox = () => {
        setViewInviteBox(true);
    }

    const getListaMembros = async (id: number) => {
        const membros: MembroResponse[] = await getMembros(id);
        const listaRegistros: Registro[] = membros.map((m) => { return { identifier: m.memberId, secondIdentifier: id, name: m.memberName, secondValue: m.tasksAmount, thirdValue: m.finishedTasksAmount } });
        setRegistros(listaRegistros);
        console.log(listaRegistros);
    }

    const getDadosEquipe = async (id: number) => {
        const dados: EquipeResponse = await getEquipe(id);
        setEquipe(dados);
    }

    const acessarTarefas = async (idMembro: number, idEquipe: number | null) => {
        navigate(`/equipes/${idEquipe}/membros/${idMembro}/tarefas`);
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
            
        }
    }

    const recusarConvite = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        console.log('Use effect');
        if (idEquipe) {
            const token: string = String(getJwt());
            connectWebSocket(token, onInvite);
            console.log(token);
            getListaMembros(Number(idEquipe));
            getDadosEquipe(Number(idEquipe));
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.sideBar}>
                <div>
                    <img src={logo} className={styles.logo} />
                </div>

                <div className={styles.buttonContainer}>
                    <Button width={200} margin={15} height={45} onClick={showInviteBox}>NOVO MEMBRO</Button>
                    <Button width={200} margin={15} height={45} color='#EB5151' mouseDownColor='#B23B3B' onClick={voltar}>VOLTAR</Button>
                </div>
            </div>

                <Invite invite={convite!} isVisible={isVisible} onAccept={aceitarConvite} onRecuse={recusarConvite} />

            <div className={styles.principal}>
                <div>
                    <Text size={30}>{equipe?.squadName}</Text>
                </div>
                <div>
                    <TableContainer><Table type='membros' values={registros} onAcessTwoArgs={acessarTarefas} onRemove={removerMembro} column1='MEMBRO' column2='QUANTIDADE DE ATIVIDADES' column3='PROGRESSO' column4='AÇÕES'></Table></TableContainer>
                </div>
            </div>


            <InputBox view={viewInviteBox} width='100vh' height='auto'>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30 }}>
                    <Text size={30} color='#EBC351' weight='bold'>CONVIDANDO MEMBRO...</Text>
                    <button style={{ color: 'white', background: 'none', borderStyle: 'none', fontSize: 30, cursor: 'pointer' }} onClick={() => setViewInviteBox(false)}><XIcon></XIcon></button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 30, marginLeft: 30, marginTop: 15 }}>
                    <Input type='text' width={630} margin='0px 0px 30px 0px' placeholder='Email do membro' value={emailMembro} onChange={(e) => setEmailMembro(e.target.value)}></Input>
                    <Button width={200} margin='0px 0px 30px 0px' height={45} onClick={enviarConvite}>ENVIAR CONVITE</Button>
                </div>
            </InputBox>
        </div>
    );
}