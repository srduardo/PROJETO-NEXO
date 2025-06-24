import { useState } from 'react';
import styles from './Input.module.css'
import type {InputProps} from './InputProps';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

export default function Input({width='auto', placeholder, value, margin=15, type, onChange}: InputProps) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const trocarVisualizacaoDeSenha = () => {
        setMostrarSenha(mostrarSenha => !mostrarSenha);
    }

    const inputType: string = type === 'password' ? (mostrarSenha ? 'text' : 'password')  : 'text';
    return (
        <> 
        { type === 'password' ? 
        <div className={styles.container}>
            <input type={inputType} className={styles.input} style={{width:width, margin:margin}} onChange={onChange} placeholder={placeholder} value={value}/>
            {mostrarSenha ? 
            <button className={styles.eye} onClick={() => trocarVisualizacaoDeSenha()}><IconEyeClosed style={{color:'#EBC351', cursor:'pointer'}}/></button>
            :
            <button className={styles.eye} onClick={() => trocarVisualizacaoDeSenha()}><IconEye style={{color:'#EBC351', cursor:'pointer'}}/></button>
            }

        </div>
        :
        <input type={type} className={styles.input} style={{width:width, margin:margin}} onChange={onChange} placeholder={placeholder} value={value} />   
        }
        </>
    )
}