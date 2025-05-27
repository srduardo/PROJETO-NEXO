import type { InputBoxProps } from './InputBoxProps';

export default function InputBox({ width, view, height, children }: InputBoxProps) {
    return (
        <div>
            {view ?
                <div style={{ width: width, height: height, borderRadius: '20px', backgroundColor: '#282828', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', flexDirection: 'column' }}>{children}</div>
                :
                <></>
            }
        </div>
    )
}