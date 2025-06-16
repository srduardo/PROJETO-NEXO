import type { TableProps } from './TableProps';
import styles from './Table.module.css';
import { IconClipboardTextFilled, IconTrashFilled, IconDoorExit, IconCircleCheckFilled } from '@tabler/icons-react';
import Button from '../button/Button';
import ProgressBar from '../progress-bar/ProgressBar';

export default function Table({ values = [], member = null, isTasksOwner = false, type = '', onDelete = () => { }, onEdit = () => { }, onRemove = () => { }, onChange = () => { }, onAcessOneArg = () => { }, onAcessTwoArgs = () => { }, column1, column2, column3, column4 }: TableProps) {
    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    <th className={styles.firstTitle}>{column1}</th>
                    <th className={styles.title}>{column2}</th>
                    <th className={styles.title}>{column3}</th>
                    <th className={styles.lastTitle}>{column4}</th>
                </tr>
            </thead>
            <tbody className={styles.item}>
                {values.map((value) => (
                    <tr key={value.identifier} >
                        {type === 'equipes' && (
                            <td className={styles.firstText}><Button margin={15} colorText='black' color='#D9D9D9' mouseDownColor='#D9D9D9' height={45} width={"auto"} onClick={() => onAcessOneArg(value.identifier)}>{value.name}</Button></td>
                        )}
                        {type === 'equipes' && (
                            <td className={styles.text}>{value.secondValue}</td>
                        )}
                        {type === 'equipes' && (
                            <td className={styles.text}>{value.thirdValue}/8</td>
                        )}
                        {type === 'equipes' && (
                            <td className={styles.lastText}>
                                <button onClick={() => onDelete(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}><IconTrashFilled /></button>
                                <button onClick={() => onEdit(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EBC351" }}><IconClipboardTextFilled /></button>
                            </td>
                        )}

                        {type === 'membros' && (
                            <td className={styles.firstText}><Button margin={15} colorText='black' color='#D9D9D9' mouseDownColor='#D9D9D9' height={45} width={"auto"} onClick={() => onAcessTwoArgs(value.identifier, value.secondIdentifier)}>{value.name}</Button></td>
                        )}
                        {type === 'membros' && (
                            <td className={styles.text}>{value.secondValue}/10</td>
                        )}
                        {type === 'membros' && (
                            // <td className={styles.text}>{value.thirdValue}/{value.secondValue}</td>
                            <td className={styles.text}><ProgressBar progress={value.thirdValue} max={value.secondValue} /></td>
                        )}
                        {type === 'membros' && member?.role === 'OWNER' && (
                            <td className={styles.lastText}>
                                {
                                    member?.role === value.fourthValue ?
                                        <div style={{ background: "none", border: "none", color: "gray" }}><IconDoorExit /></div>
                                        :
                                        <button onClick={() => onRemove(value.identifier, value.secondIdentifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}><IconDoorExit /></button>
                                }
                            </td>
                        )}
                        {type === 'membros' && member?.role === 'MEMBER' && (
                            <td className={styles.lastText}>
                                {
                                    member?.memberId !== value.identifier ?
                                        <div style={{ background: "none", border: "none", color: "gray" }}><IconDoorExit /></div>
                                        :
                                        <button onClick={() => onRemove(value.identifier, value.secondIdentifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}><IconDoorExit /></button>
                                }
                            </td>
                        )}


                        {type === 'tarefas' && (
                            <td className={styles.firstText} style={{ padding: '15px', color: 'black', fontWeight: 'bold', fontSize: 20 }}>{value.name}</td>
                        )}
                        {type === 'tarefas' && (
                            <td className={styles.text}>{value.secondValue}</td>
                        )}
                        {type === 'tarefas' && (
                            <td className={styles.text}>{value.thirdValue}</td>
                        )}
                        {type === 'tarefas' && (
                            <td className={styles.lastText}>
                                { isTasksOwner  ? 
                                    <>
                                        {
                                            value.thirdValue === 'PENDENTE' ?
                                                <button onClick={() => onChange(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "gray" }}><IconCircleCheckFilled /></button>
                                                :
                                                <button onClick={() => onChange(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "green" }}><IconCircleCheckFilled /></button>
                                        }
                                        <button onClick={() => onEdit(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EBC351" }}><IconClipboardTextFilled /></button>
                                        <button onClick={() => onDelete(value.identifier)} style={{ background: "none", border: "none", cursor: "pointer", color: "red" }}><IconTrashFilled /></button>
                                    </>
                                    :
                                    <>
                                        <button style={{ background: "none", border: "none", color: "gray" }}><IconCircleCheckFilled /></button>
                                        <button style={{ background: "none", border: "none", color: "gray" }}><IconClipboardTextFilled /></button>
                                        <button style={{ background: "none", border: "none", color: "gray" }}><IconTrashFilled /></button>
                                    </>
                                }
                            </td>
                        )}

                    </tr>
                ))}
            </tbody>
        </table >
    );
}