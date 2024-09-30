import { useLocation } from 'wouter';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { Fireplace } from '../../components/fireplace/Fireplace';
import styles from './Landing.module.scss';
import { useEffect, useRef, useState } from 'react';

export interface LandingProps {
    class?: string;

}

const Landing = () => {
    const [, setLocation] = useLocation();
    const [show, setShow] = useState(false);
    const transitionRef = useRef(null);

    useEffect(() => setShow(true), []);

    return <CSSTransition
        nodeRef={transitionRef}
        in={show}
        classNames={{
            enter: styles.landingEnter,
            enterActive: styles.landingEnterActive,
            enterDone: styles.landingEnterDone,
            exit: styles.landingExit,
            exitActive: styles.landingExitActive,
            exitDone: styles.landingExitDone,
        }}
        onExited={() => setLocation("/home")}
        timeout={{
            enter: 5000,
            exit: 500,
        }}
    >
        <div className={classnames(styles.center)} ref={transitionRef}>
            <p className={styles.blurb}>stay a while and <a href="/home" onClick={(e) => {
                e.preventDefault();
                setShow(false);
            }}>rest</a></p>
            <Fireplace />
        </div>
    </CSSTransition>
}

export default Landing;