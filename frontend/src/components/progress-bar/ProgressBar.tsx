import type { ProgressBarProps } from './ProgressBarProps';

export default function ProgressBar({ progress=0, max=0 }: ProgressBarProps) {

    const calcular = (): number => {
        if (Number(max) > 0 ) {
            const x: number = Number(progress) * 100;
            const result: number = x / Number(max);
            return result;
        }

        return 0;
    }

    return (
        <div style={{width:'100%', height:'10px', backgroundColor:'gray', borderRadius:'20px'}}>
            <div style={{width:`${calcular()}%`, height:'100%', backgroundColor:'green', borderRadius:'20px'}}/>
        </div>
    )
}