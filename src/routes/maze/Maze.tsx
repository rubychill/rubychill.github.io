import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Maze.module.scss';
import { MazeRender } from './MazeRender';
import { MazeMap } from './types';
import without from 'lodash/without';

export interface MazeProps {
    class?: string;
}

const cameraFov = 60;
const cameraResolution = 60

export const Maze = () => {
    const [keyDownList, setKeyDownList] = useState<string[]>([]);
    const [cameraPos, setCameraPos] = useState({ x: 4, y: 4 });
    const [cameraAngle, setCameraAngle] = useState(90);

    useEffect(() => {
        const handleKeyDown = (evt: KeyboardEvent) => {
            setKeyDownList((prev) => [...prev, evt.key])
        };

        const handleKeyUp = (evt: KeyboardEvent) => {
            setKeyDownList((prev) => without(prev, evt.key));
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keydown", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keydown", handleKeyUp);
        }
    }, []);

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
        keyDownList.forEach((key) => {
            if (key === "ARROWLEFT") {
                setCameraAngle((prev) => prev += (rotSpeed * frameTime / 1000));
            }
            if (key === "ARROWRIGHT") {
                setCameraAngle((prev) => prev -= (rotSpeed * frameTime / 1000));
            }
            if (key === "ARROWUP") {
                setCameraPos((prev) => ({ x: prev.x + Math.sin(Math.PI * 2 * cameraAngle / 360) * (moveSpeed * frameTime / 1000), y: prev.y + Math.cos(Math.PI * 2 * cameraAngle / 360) * (moveSpeed * frameTime / 1000) }));
            }
            if (key === "ARROWDOWN") {
                setCameraPos((prev) => ({ x: prev.x - Math.sin(Math.PI * 2 * cameraAngle / 360) * (moveSpeed * frameTime / 1000), y: prev.y - Math.cos(Math.PI * 2 * cameraAngle / 360) * (moveSpeed * frameTime / 1000) }));
            }
        });
    }, frameTime);

    return <div className={classnames(styles.maze)}>
        <MazeRender
            mazeMap={mazeMap}
            horizontalResolution={cameraResolution}
            cameraFov={cameraFov}
            cameraAngle={cameraAngle}
            cameraPos={cameraPos}
        />
    </div>
}