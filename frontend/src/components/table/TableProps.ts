import type { Registro } from '../../types/Registro';

export interface TableProps {
    values?: Registro[];
    onDelete?: (index: number) => void;
    onRemove?: (userId: number, squadId: number | null) => void;
    onEdit?: (index: number) => void; 
    onChange?: (index: number) => void; 
    
    onAcessTwoArgs?: (identifier: number, secondIdentifier: number | null) => void;
    onAcessOneArg?: (identifier: number) => void;
    
    column1: string;
    column2: string;
    column3: string;
    column4: string;
    
    type?: string;
}