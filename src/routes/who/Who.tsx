import classnames from 'classnames';
import styles from './Who.module.scss';

export const Who = () => {
    return <div class={classnames(styles.who)}>
        <h1>hi i'm ruby~</h1>
        <p class={styles.gay}><span>g</span><span>a</span><span>y</span> <span>t</span><span>r</span><span>a</span><span>n</span><span>s</span> hacker nerd</p>
        <p><a href="https://github.com/rubychill">github</a></p>
    </div>
}