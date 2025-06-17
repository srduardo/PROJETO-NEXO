import type { WarnProps } from './WarnProps';
import styles from './Warn.module.css';

export default function Warn({ type, view = false, differentCondition, descriptionLength}: WarnProps) {


    return (
        <div>
            {type === 'Credenciais' && view ?
                <div className={styles.warn}>
                    Credenciais inválidas!
                </div>
                :
                <>
                </>
            }
            {type === 'Nome' && view ?
                <div className={styles.warn}>
                    Nome inválido!
                </div>
                :
                <>
                </>
            }
            {type === 'Email' && view ?
                <>
                    {differentCondition ?
                        <div className={styles.warn}>
                            Usuário não encontrado!
                        </div>
                        :
                        <div className={styles.warn}>
                            Email inválido!
                        </div>
                    }
                </>
                :
                <>
                </>
            }
            {type === 'Dados' && view ?

                <>
                    {differentCondition ?
                        <div className={styles.warn}>
                            Descrição muito longa - {descriptionLength}/300
                        </div>
                        :
                        <div className={styles.warn}>
                            Dados inválidos!
                        </div>
                    }
                </>
                :
                <>
                </>
            }
        </div>
    )
}