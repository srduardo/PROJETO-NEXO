import { useState } from 'react';
import type {InputProps} from './InputProps';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

export default function Input({width, placeholder, value, margin, type, onChange}: InputProps) {
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const trocarVisualizacaoDeSenha = () => {
        setMostrarSenha(mostrarSenha => !mostrarSenha);
    }

    const inputType: string = type === 'password' ? (mostrarSenha ? 'text' : 'password')  : 'text';
    return (
        <> 
        { type === 'password' ? 
        <div style={{height:'auto', width:'auto', display:'flex', flexDirection:'row', alignItems:'center', marginInlineStart:25}}>
            <input type={inputType} style={{width: width, height: 40, fontSize: 20, borderRadius: 8, paddingInlineStart: 10, paddingInlineEnd: 10, borderStyle: 'none', margin: margin}} onChange={onChange} placeholder={placeholder} value={value}/>
            {mostrarSenha ? 
            <button style={{background: "none", border: "none", margin:0, padding:0, marginTop:8}} onClick={() => trocarVisualizacaoDeSenha()}><IconEyeClosed style={{color:'#EBC351', cursor:'pointer'}}/></button>
            :
            <button style={{background: "none", border: "none", margin:0, padding:0, marginTop:8}} onClick={() => trocarVisualizacaoDeSenha()}><IconEye style={{color:'#EBC351', cursor:'pointer'}}/></button>
            }

        </div>
        :
        <input type={type} style={{width: width, height: 40, fontSize: 20, borderRadius: 8, paddingInlineStart: 10, paddingInlineEnd: 10, borderStyle: 'none', margin: margin}} onChange={onChange} placeholder={placeholder} value={value} />   
        }
        </>
    )
}