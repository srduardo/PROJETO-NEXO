import { useState } from 'react';
import type {ButtonProps} from './ButtonProps';

export default function Button({width, height, color, children, onClick}: ButtonProps) {
  const [hover, setHover] = useState(false);
  
    const style = {
        width: width, 
        height: height, 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: 'white', 
        borderRadius: 8, 
        paddingInlineStart: 10, 
        paddingInlineEnd: 10, 
        borderStyle: 'none', 
        margin: 15, 
        backgroundColor: hover ? "#AD903E" : color,
        cursor: 'pointer'   
    }

    return (
        <button style={style} onClick={onClick} onMouseDown={() => setHover(true)} onMouseUp={() => setHover(false)} onMouseLeave={() => setHover(false)}>{children}</button>
    )
}