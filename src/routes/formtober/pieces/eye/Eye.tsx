import classNames from "classnames";
import styles from "Eye.module.scss";
import { JSX } from "solid-js";
import { Vector2 } from "three";

export interface EyeProps {
    style?: JSX.CSSProperties | string;
    class?: string;
    position: Vector2;
    pupilPosition: Vector2;
    onClick: () => void;
}

export const Eye = (props: EyeProps) => {
    return <div class={classNames(styles.eye, props.class)} style={props.style} onClick={props.onClick}>
        <div class={styles.pupil}></div>
    </div>
}