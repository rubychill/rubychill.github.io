import { createShortcut } from '@solid-primitives/keyboard';
import classnames from 'classnames';
import range from 'lodash/range';
import { createMemo, createSignal, For, Show } from 'solid-js';
import styles from './MazeRender.module.scss';
import { MazeMap } from './types';
import { abs, deg2rad, rayLineIntersection, sub, Vector } from './util';

export interface MazeRenderProps {
    class?: string;
    mazeMap: MazeMap;
    cameraPos: { x: number, y: number };
    cameraFov: number;
    cameraAngle: number;
    horizontalResolution: number;
}

export const MazeRender = (props: MazeRenderProps) => {
    const wallHeight = 0.06;
    const [debug, setDebug] = createSignal(false);
    createShortcut(["M"], () => setDebug((prev) => !prev));
    const rayAngles = createMemo(() => {
        const rayAngles: number[] = [];
        const startingAngle = props.cameraAngle - (props.cameraFov / 2);
        const endingAngle = props.cameraAngle + (props.cameraFov / 2);
        const angleDelta = props.cameraFov / props.horizontalResolution;
        for (const ray of range(props.horizontalResolution)) {
            rayAngles.unshift(startingAngle + (ray * angleDelta) + (angleDelta / 2));
        }
        return rayAngles;
    });

    const rays = createMemo(() => {
        const rayAnglesRad = rayAngles().map((angle) => Math.PI * 2 * angle / 360);
        const rays = rayAnglesRad.map((angle) => {
            return {
                x: Math.sin(angle),
                y: Math.cos(angle),
            }
        });

        return rays;
    })

    const allRayHits = createMemo(() => {
        const rayHits = rays().map((ray) => {
            const hits: Vector[] = [];
            for (const wall of props.mazeMap.walls) {
                const hitCheck = rayLineIntersection(props.cameraPos, ray, wall.p1, wall.p2);
                if (hitCheck) {
                    hits.push(hitCheck);
                }
            }
            return hits;
        });

        return rayHits;
    })

    const rayHits = createMemo(() => {
        const rayHits = rays().map((ray) => {
            let currentHit;
            let currentHitLength;
            for (const wall of props.mazeMap.walls) {
                const hitCheck = rayLineIntersection(props.cameraPos, ray, wall.p1, wall.p2);
                if (hitCheck) {
                    const hitCheckDistance = abs(sub(hitCheck, props.cameraPos));

                    if (currentHitLength === undefined || hitCheckDistance < currentHitLength) {
                        currentHit = hitCheck;
                        currentHitLength = hitCheckDistance;
                    }
                }
            }
            return currentHit;
        });

        return rayHits;
    })

    const rayHitLengths = createMemo(() => {
        return rayHits().map((ray) => {
            if (ray) {
                return abs(sub(ray, props.cameraPos));
            }
        });
    })

    const multiplier = () => {
        let minX: number = Number.MAX_SAFE_INTEGER;
        let maxX: number = Number.MIN_SAFE_INTEGER;
        let minY: number = Number.MAX_SAFE_INTEGER;
        let maxY: number = Number.MIN_SAFE_INTEGER;
        props.mazeMap.walls.forEach((wall) => {
            if (wall.p1.x < minX) {
                minX = wall.p1.x;
            }
            if (wall.p1.x > maxX) {
                maxX = wall.p1.x;
            }
            if (wall.p2.x < minX) {
                minX = wall.p2.x;
            }
            if (wall.p2.x > maxX) {
                maxX = wall.p2.x;
            }
            if (wall.p1.y < minY) {
                minY = wall.p1.y;
            }
            if (wall.p1.y > maxY) {
                maxY = wall.p1.y;
            }
            if (wall.p2.y < minY) {
                minY = wall.p2.y;
            }
            if (wall.p2.y > maxY) {
                maxY = wall.p2.y;
            }
        });

        const multiplierX = 200 / (maxX - minX);
        const multiplierY = 200 / (maxY - minY);

        return { x: multiplierX, y: multiplierY };
    }

    let renderSvg: SVGSVGElement | undefined;
    const renderGap = 5;
    const renderCalcXPos = (index: number) => {
        return `${index} * ${100 / props.horizontalResolution}% + ${renderGap / 2}px`;
    }
    const renderCalcWidth = (index: number) => {
        return `${100 / props.horizontalResolution}% - ${renderGap}px`;
    }
    const renderCalcHeight = (rayHitLength: number | undefined) => {
        if (renderSvg && rayHitLength) {
            const renderHeight = renderSvg.clientWidth || window.innerWidth;
            const renderWidth = renderSvg.clientHeight || 700;
            const aspectRatio = renderWidth / renderHeight;
            const verticalFov = 2 * Math.atan(Math.tan(deg2rad(props.cameraFov) / 2) * aspectRatio);
            const angularHeight = Math.atan(wallHeight / rayHitLength) * 2;
            return (angularHeight / verticalFov) * renderHeight;
        } else {
            return 0;
        }
    }
    const renderCalcYPos = (rayHitLength: number | undefined) => {
        if (renderSvg && rayHitLength) {
            const renderHeight = renderSvg.clientHeight || 700;
            const drawHeight = renderCalcHeight(rayHitLength);
            return (renderHeight - drawHeight) / 2;
        } else {
            return 0;
        }
    }
    const renderCalcOpacity = (rayHitLength: number | undefined) => {
        if (renderSvg && rayHitLength) {
            const renderHeight = renderSvg.clientHeight || 700;
            const drawHeight = renderCalcHeight(rayHitLength);
            return Math.pow(1.3, 1 - (renderHeight / drawHeight));
        } else {
            return 0;
        }
    }

    return <div class={classnames(props.class, styles.mazeRender)}>
        <Show when={debug()}>
            {/* <div class={styles.debug}>
                <For each={rayAngles()}>
                    {(rayAngle, i) => <div>
                        <div>{rayAngle.toFixed(0)}</div>
                        <div>x: {rays()[i()].x.toFixed(2)} y: {rays()[i()].y.toFixed(2)}</div>
                        <Show when={rayHits()[i()]}><div>x: {rayHits()[i()]!.x.toFixed(2)} y: {rayHits()[i()]!.y.toFixed(2)}</div></Show>
                        <div>{rayHitLengths()[i()]?.toFixed(2)}</div>
                    </div>}
                </For>
            </div> */}
            <div class={styles.debugMap}>
                <svg width={"250px"} height={"250px"} viewBox={"-50 -50 300 300"}>
                    <circle cx={props.cameraPos.x * multiplier().x} cy={props.cameraPos.y * multiplier().y} r={3} style={"stroke:white;stroke-width:1"} />
                    <For each={props.mazeMap.walls}>
                        {(wall) => <line x1={wall.p1.x * multiplier().x} y1={wall.p1.y * multiplier().y} x2={wall.p2.x * multiplier().x} y2={wall.p2.y * multiplier().y} style="stroke:white;stroke-width:1" />}
                    </For>
                    <For each={allRayHits()}>
                        {(rays) => <For each={rays}>{(ray) => <>
                            <line x1={props.cameraPos.x * multiplier().x} y1={props.cameraPos.y * multiplier().y} x2={ray!.x * multiplier().x} y2={ray!.y * multiplier().y} style="stroke:white;stroke-width:1" />
                            <circle cx={ray!.x * multiplier().x} cy={ray!.y * multiplier().y} r={2} style="stroke:red;stroke-width:1" />
                        </>}</For>}
                    </For>
                </svg>
            </div>
        </Show>
        <svg width={"100%"} height={"700px"} ref={renderSvg}>
            <For each={rayHitLengths()}>
                {(rayLength, i) => <rect
                    x={`calc(${renderCalcXPos(i())})`}
                    y={renderCalcYPos(rayLength)}
                    width={`calc(${renderCalcWidth(i())}`}
                    height={renderCalcHeight(rayLength)}
                    fill={"#EAF0CE"}
                    opacity={renderCalcOpacity(rayLength)}
                />}
            </For>
        </svg>
    </div>
}