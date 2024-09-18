import classnames from 'classnames';
import styles from './Home.module.scss';

export const Home = () => {
    return <div class={classnames(styles.home)}>
        <h1>welcome</h1>
        <a href={"/who"}>who</a>
        <div class={classnames(styles.experiments)}>
            <p>experiments</p>
            <a href={"/room"}>0</a>
            <a href={"/maze"}>1[WIP]</a>
        </div>
    </div>
}