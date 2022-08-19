import { Link } from '@solidjs/router';
import classnames from 'classnames';
import { Fireplace } from '../../components/fireplace/Fireplace';
import { TransitionLink } from '../../components/transitionLink/TransitionLink';
import { TransitionNavigation, useTransitionNavigation } from '../../components/transitionLink/TransitionNavigation';
import styles from './Landing.module.scss';

export interface LandingProps {
    class?: string;

}

export const Landing = (props: LandingProps) => {


    return <TransitionNavigation animationDuration={500} from={{ opacity: 1 }} to={{ opacity: 0 }}>
        <LandingInner {...props} />
    </TransitionNavigation>
}

const LandingInner = (props: LandingProps) => {
    const transition = useTransitionNavigation();

    return <div class={classnames(props.class, styles.center, transition?.transitionClass)}>
        <p class={styles.blurb}>stay a while and <TransitionLink href="/home">rest</TransitionLink></p>
        <Fireplace />
    </div>
}