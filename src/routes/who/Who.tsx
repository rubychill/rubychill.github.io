import classnames from 'classnames';
import styles from './Who.module.scss';

export interface WhoProps {
    class?: string;

}

export const Who = (props: WhoProps) => {
    return <div class={classnames(props.class)}>
        <h1>ruby chill</h1>
    </div>
}