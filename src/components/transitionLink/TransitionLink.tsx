import classnames from 'classnames';
import { JSX } from 'solid-js';
import styles from './TransitionLink.module.scss';
import { useTransitionNavigation } from './TransitionNavigation';

export interface TransitionLinkProps {
    class?: string;
    children: JSX.Element;
    href: string;
}

export const TransitionLink = (props: TransitionLinkProps) => {
    const transition = useTransitionNavigation();

    console.log(transition);

    return <>
        <a
            href={props.href}
            class={classnames(props.class)}
            onClick={(e) => transition?.onLinkClick(e, props.href)}
        >
            {props.children}
        </a>
    </>
}