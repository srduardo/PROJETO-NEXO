import type { EquipeProps } from './TableProps';
import styles from './Table.module.css';
import { IconClipboardTextFilled, IconTrashFilled } from '@tabler/icons-react';
import Button from '../button/Button';

export default function Table({ equipes = [], onDelete, onEdit, onClick}: EquipeProps) {
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    <th className={styles.firstTitle}>NOME DA EQUIPE</th>
                    <th className={styles.title}>LÍDER DA EQUIPE</th>
                    <th className={styles.title}>QTD. MEMBROS</th>
                    <th className={styles.lastTitle}>AÇÕES</th>
                </tr>
            </thead>
            <tbody className={styles.item}>
                {equipes.map((equipe) => (
                    <tr key={equipe.squadId} >
                        <td className={styles.firstText}><Button  margin={15} colorText='black' color='#D9D9D9' mouseDownColor='#D9D9D9' height={45} width={"auto"} onClick={onClick}>{equipe.squadName}</Button></td>
                        <td className={styles.text}>{equipe.ownerName}</td>
                        <td className={styles.text}>{equipe.membersAmount}/8</td>
                        <td className={styles.lastText}>
                            <button onClick={() => onDelete(equipe.squadId)} style={{ background: "none", border: "none", cursor: "pointer", color:"red"}}><IconTrashFilled/></button>
                            <button onClick={() => onEdit(equipe.squadId)} style={{ background: "none", border: "none", cursor: "pointer", color:"#EBC351"}}><IconClipboardTextFilled/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}