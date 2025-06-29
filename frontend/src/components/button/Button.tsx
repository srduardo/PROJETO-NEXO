import { useState } from 'react';
import type {ButtonProps} from './ButtonProps';

export default function Button({width, height, color='#EBC351', mouseDownColor='#AD903E', children, colorText = 'white', margin, onClick}: ButtonProps) {
  const [hover, setHover] = useState(false);
  
    const style = {
        width: width, 
        height: height, 
        fontSize: '1.1rem', 
        fontWeight: 'bold', 
        color: colorText, 
        borderRadius: 8, 
        paddingInlineStart: 10, 
        paddingInlineEnd: 10, 
        borderStyle: 'none', 
        margin: margin, 
        backgroundColor: hover ? mouseDownColor : color,
        cursor: 'pointer'   
    }

    return (
        <button style={style} onClick={onClick} onMouseDown={() => setHover(true)} onMouseUp={() => setHover(false)} onMouseLeave={() => setHover(false)}>{children}</button>
    )
}