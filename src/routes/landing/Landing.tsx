import { useNavigate } from '@solidjs/router';
import classnames from 'classnames';
import { createSignal, lazy } from 'solid-js';
import { Transition } from 'solid-transition-group';
//import { Fireplace } from '../../components/fireplace/Fireplace';
import styles from './Landing.module.scss';

const Fireplace = lazy(() => import('../../components/fireplace/Fireplace'));

export interface LandingProps {
    class?: string;

}

export const Landing = () => {
    const navigate = useNavigate();
    const [show, setShow] = createSignal(true);

    return <Transition
        appear={true}
        onEnter={(el, done) => {
            const a = el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 5000 });
            a.finished.then(() => {
                if (el instanceof HTMLElement) {
                    el.style.opacity = "1";
                }
                done();
            });
        }}
        onExit={(el, done) => {
            let startingOpacity = "1";
            if (el instanceof HTMLElement) {
                startingOpacity = el.style.opacity;
            }
            const a = el.animate([{ opacity: startingOpacity }, { opacity: 0 }], { duration: 500 });
            a.finished.then(() => {
                navigate("/home");
                done();
            });
        }}
    >
        {show() && <div class={classnames(styles.center)}>
            <p class={styles.blurb}>stay a while and <a href="/home" onClick={(e) => {
                e.preventDefault();
                setShow(false);
            }}>rest</a></p>
            <Fireplace />
        </div>}
    </Transition>
}