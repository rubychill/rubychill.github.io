import classNames from 'classnames';
import styles from './DateLabel.module.scss';

interface DateLabelProps {
    from?: string;
    to: string;
    fromClass?: string;
    toClass?: string;
    hyphenClass?: string;
}

export const DateLabel = (props: DateLabelProps) => {
    return <>
        {props.from ? <><div class={props.fromClass}>{props.from}</div><div class={props.hyphenClass}>-</div></> : <><div></div><div></div></>}
        <div class={props.toClass}>{props.to}</div>
    </>;
}