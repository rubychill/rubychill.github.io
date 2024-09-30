import classnames from 'classnames';
import styles from './CornerMenu.module.scss';
import CornerIcon from './corner-icon.svg?react';
import { Link } from 'wouter';

export interface CornerMenuProps {
    class?: string;

}

export const CornerMenu = (props: CornerMenuProps) => {


    return <div className={classnames(props.class, styles.icon)}>
        <Link href={"/home"}><CornerIcon /></Link>
    </div>
}