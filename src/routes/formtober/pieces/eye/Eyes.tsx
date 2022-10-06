import classNames from "classnames"
import { createSignal, For, onCleanup } from "solid-js";
import { Vector2 } from "three";
import { Eye } from "./Eye";
import styles from "./Eyes.module.scss";

interface EyeInfo {
    position: Vector2;
    pupilPosition: Vector2;
}

interface EyesProps {
    class?: string;
}

export const Eyes = (props: EyesProps) => {
    const [eyes, setEyes] = createSignal<EyeInfo[]>([
        {
            position: new Vector2(window.innerWidth / 2, window.innerHeight),
            pupilPosition: new Vector2(0, 0),
        }
    ]);

    const getPupilPosition = (eyePosition: Vector2, mousePosition: Vector2): Vector2 => {
        if (eyePosition.distanceTo(mousePosition) > 50) {
            return eyePosition.sub(mousePosition).normalize();
        } else {
            return new Vector2(0, 0);
        }
    }

    const onMouseMove = (ev: MouseEvent) => {
        setEyes((prev) => prev.map((eye) => ({
            position: eye.position,
            pupilPosition: getPupilPosition(eye.position, new Vector2(ev.pageX, ev.pageY)),
        })));
    }
    window.addEventListener("mousemove", onMouseMove);
    onCleanup(() => window.removeEventListener("mousemove", onMouseMove));

    return <div class={classNames(props.class)}>
        <div>LOOK ME IN THE EYE</div>
        <For each={eyes()}>
            {(eye) => <Eye pupilPosition={eye.pupilPosition} position={eye.position} />}
        </For>
    </div>
}