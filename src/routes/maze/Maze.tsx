import { createShortcut, useKeyDownList } from '@solid-primitives/keyboard';
import classnames from 'classnames';
import { createSignal } from 'solid-js';
import { style } from 'solid-js/web';
import styles from './Maze.module.scss';
import { MazeRender } from './MazeRender';
import { MazeMap } from './types';

export interface MazeProps {
    class?: string;

}

export const Maze = () => {
    const keys = useKeyDownList();
    const [cameraPos, setCameraPos] = createSignal({ x: 4, y: 4 });
    const [cameraAngle, setCameraAngle] = createSignal(90);
    const [cameraFov, setCameraFov] = createSignal(60);
    const [cameraResolution, setCameraResolution] = createSignal(60);

    createShortcut([","], () => {
        setCameraFov((prev) => prev - 5);
    });
    createShortcut(["."], () => {
        setCameraFov((prev) => prev + 5);
    });
    createShortcut(["["], () => {
        setCameraResolution((prev) => prev - 10);
    });
    createShortcut(["]"], () => {
        setCameraResolution((prev) => prev + 10);
    });

    const mazeMap: MazeMap = { walls: [] };
    const mazeHeight = 10;
    const mazeWidth = 10;
    mazeMap.walls.push({ p1: { x: 0, y: 0 }, p2: { x: mazeWidth, y: 0 } });
    mazeMap.walls.push({ p1: { x: mazeWidth / 2, y: 0 }, p2: { x: mazeWidth / 2, y: mazeHeight / 2 } });
    mazeMap.walls.push({ p1: { x: mazeWidth, y: 0 }, p2: { x: mazeWidth, y: mazeHeight } });
    mazeMap.walls.push({ p1: { x: mazeWidth, y: mazeHeight }, p2: { x: 0, y: mazeHeight } });
    mazeMap.walls.push({ p1: { x: 0, y: mazeHeight }, p2: { x: 0, y: 0 } });

    const frameTime = 33;
    const rotSpeed = 80;
    const moveSpeed = 3;
    setInterval(() => {
        keys().forEach((key) => {
            if (key === "ARROWLEFT") {
                setCameraAngle((prev) => prev += (rotSpeed * frameTime / 1000));
            }
            if (key === "ARROWRIGHT") {
                setCameraAngle((prev) => prev -= (rotSpeed * frameTime / 1000));
            }
            if (key === "ARROWUP") {
                setCameraPos((prev) => ({ x: prev.x + Math.sin(Math.PI * 2 * cameraAngle() / 360) * (moveSpeed * frameTime / 1000), y: prev.y + Math.cos(Math.PI * 2 * cameraAngle() / 360) * (moveSpeed * frameTime / 1000) }));
            }
            if (key === "ARROWDOWN") {
                setCameraPos((prev) => ({ x: prev.x - Math.sin(Math.PI * 2 * cameraAngle() / 360) * (moveSpeed * frameTime / 1000), y: prev.y - Math.cos(Math.PI * 2 * cameraAngle() / 360) * (moveSpeed * frameTime / 1000) }));
            }
        });
    }, frameTime);

    return <div class={classnames(styles.maze)}>
        <MazeRender
            mazeMap={mazeMap}
            horizontalResolution={cameraResolution()}
            cameraFov={cameraFov()}
            cameraAngle={cameraAngle()}
            cameraPos={cameraPos()}
        />
    </div>
}