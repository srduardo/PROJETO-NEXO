import type {TableContainerProps} from './TableContainerProps';
import styles from './TableContainer.module.css';

export default function Text({children}: TableContainerProps) {
    return (
        <div className={styles.tableContainer}>{children}</div>
    )
}