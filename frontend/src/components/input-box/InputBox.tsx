import type { InputBoxProps } from './InputBoxProps';

export default function InputBox({ width, view, height, children }: InputBoxProps) {
    return (
        <div>
            {view ?
                <div>
                    <div style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 10}}/>
                    <div style={{ zIndex:20, width: width, height: height, padding: '30px', borderRadius: '20px', backgroundColor: '#282828', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column' }}>{children}</div>
                </div>
                :
                <></>
            }
        </div>
    )
}