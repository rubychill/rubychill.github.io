import classnames from 'classnames';
import styles from './CornerMenu.module.scss';
import CornerIcon from './corner-icon.svg';

export interface CornerMenuProps {
    class?: string;

}

export const CornerMenu = (props: CornerMenuProps) => {


    return <div class={classnames(props.class)}>
        <div class={styles.icon}>
            <CornerIcon />
        </div>
    </div>
}