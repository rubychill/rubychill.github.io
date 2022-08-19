import classnames from 'classnames';
import styles from './Home.module.scss';

export interface HomeProps {
    class?: string;

}

export const Home = (props: HomeProps) => {
    return <div class={classnames(props.class)}>
        <h1>Welcome</h1>
    </div>
}