import type { InviteProps } from './InviteProps';
import styles from './Invite.module.css';
import Button from '../button/Button';

export default function InputBox({ invite, isVisible = false, onAccept, onRecuse }: InviteProps) {

    return (
        <div>
            {
                isVisible ?
                    <div>
                        <div className={styles.overlay}/>
                        <div className={styles.invite}>
                            <p className={styles.text}>{invite.senderName.toUpperCase()} TE CONVIDOU PARA {invite.squadName.toUpperCase()}</p>
                            <div className={styles.buttons}>
                                <Button width={150} color='green' onClick={onAccept} height={30} margin={5} mouseDownColor='#035900'>Aceitar</Button>
                                <Button width={150} color='red' onClick={onRecuse} height={30} margin={5} mouseDownColor='#800006'>Recusar</Button>
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
            }
        </div>
    )
}