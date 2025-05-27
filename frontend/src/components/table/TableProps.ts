import type { EquipeResponse } from '../../types/EquipeResponse';

export interface EquipeProps {
    equipes?: EquipeResponse[];
    onDelete: (index: number) => void;
    onEdit: (index: number) => void;
    onClick: () => void;
}