import styles from "Eye.module.scss";
import { Vector2 } from "three";

export interface EyeProps {
    position: Vector2;
    pupilPosition: Vector2;
}

export const Eye = (props: EyeProps) => {
    return <div class={styles.eye}>
        <div class={styles.pupil}></div>
    </div>
}