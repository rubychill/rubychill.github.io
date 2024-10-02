import classnames from 'classnames';
import styles from './Home.module.scss';
import { Link } from 'wouter';
import { RouteTransition } from '../RouteTransition';

export const Home = () => {
    return <RouteTransition
        className={classnames(styles.home)}
    >
        <h1>welcome</h1>
        <Link href={"/who"}>who</Link>
        <div className={classnames(styles.experiments)}>
            <p>experiments</p>
            <Link href={"/room"}>0</Link>
            {/* <Link href={"/maze"}>1[WIP]</Link> */}
        </div>
    </RouteTransition>
}