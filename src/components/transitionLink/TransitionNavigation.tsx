import uniqueId from 'lodash/uniqueId';
import kebabCase from 'lodash/kebabCase';
import { createContext, JSX, useContext, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

interface TransitionContextProvided {
    transitionClass: string;
    onLinkClick: (e: MouseEvent, href: string) => void;
}

const TransitionContext = createContext<TransitionContextProvided>();

export interface TransitionNavigationProps {
    children: JSX.Element;
    animationDuration: number;
    from: JSX.CSSProperties | string;
    to: JSX.CSSProperties | string;
}

export const TransitionNavigation = (props: TransitionNavigationProps) => {
    const navigate = useNavigate();
    const [animate, setAnimate] = createSignal(false);
    const animationName = uniqueId("transitionAnimation");
    const transitionClass = uniqueId("transitionClass");

    const fromString = typeof props.from === 'string' ? props.from : Object.entries(props.from).reduce((acc, [key, value]) => {
        return acc + `${kebabCase(key)}: ${value};`;
    }, "");
    const toString = typeof props.to === 'string' ? props.to : Object.entries(props.to).reduce((acc, [key, value]) => {
        return acc + `${kebabCase(key)}: ${value};`;
    }, "");

    return <TransitionContext.Provider value={{
        transitionClass,
        onLinkClick: (e, href) => {
            console.log(e);
            e.preventDefault();
            setAnimate(true);
            setTimeout(() => navigate(href), props.animationDuration);
        }
    }}>
        <style>
            {`
            @keyframes ${animationName} {
                from {${fromString}}
                to {${toString}}
            }

            ${animate() ? `
                .${transitionClass} {
                    animation: ${animationName} ${props.animationDuration / 1000}s;
                    ${toString}
                }
            ` : ""}
            `}
        </style>
        {props.children}
    </TransitionContext.Provider>
}

export const useTransitionNavigation = () => useContext(TransitionContext);