import classnames from 'classnames';
import styles from './Room.module.scss';
import { PerspectiveCamera, Scene, WebGLRenderer, CubicBezierCurve3, Vector3, BufferGeometry, LineBasicMaterial, Line, Vector2, Plane, TextureLoader, NearestFilter, SpriteMaterial, Sprite } from 'three';
import { onCleanup } from 'solid-js';
import { range } from 'lodash';
import boyPng from './boy.png';

export interface RoomProps {
    class?: string;
}

const gridResolution = 20;
const lineResolution = 11;
const rotateAmount = 0.2;

export const Room = (props: RoomProps) => {
    const scene = new Scene();

    const camera = new PerspectiveCamera(75, 4 / 3, 0.1, 1000);
    camera.position.set(0, -0.6, 0.2);
    camera.rotation.x = (Math.PI / 180) * 70;

    const renderer = new WebGLRenderer({ antialias: false });
    renderer.setSize(400, 300);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x24212c);

    const material = new LineBasicMaterial({ color: 0xffffff });
    const dropPoint = 0.2;

    const curveFn = (x: number) => ((45 * Math.pow(x - 0.2, 1 / 6)) / 53) - 0.7

    const lines: Vector3[][] = [];
    range(gridResolution + 1).forEach((i) => {
        const offset = i / gridResolution - 0.5;
        // horizontal
        let segment = 0;
        let segments: Vector3[] = [];
        range(lineResolution + 1).forEach((segment) => {
            const x = segment / lineResolution - 0.5;
            const y = offset;

            const curveX = new Vector2(x, y).distanceTo(new Vector2(0, 0));
            if (curveX > dropPoint) {
                segments.push(new Vector3(x, y, curveFn(curveX)));
            } else {
                if (segments.length) {
                    segments.push(new Vector3(x, y, -1));
                    lines.push([...segments]);
                    segments = [];
                    segments.push(new Vector3(x, y, -1));
                }
            }
        });
        lines.push([...segments]);

        // vertical
        segment = 0;
        segments = [];
        range(lineResolution + 1).forEach((segment) => {
            const y = segment / lineResolution - 0.5;
            const x = offset;

            const curveX = new Vector2(x, y).distanceTo(new Vector2(0, 0));
            if (curveX > dropPoint) {
                segments.push(new Vector3(x, y, curveFn(curveX)));
            } else {
                if (segments.length) {
                    segments.push(new Vector3(x, y, -1));
                    lines.push([...segments]);
                    segments = [];
                    segments.push(new Vector3(x, y, -1));
                }
            }
        });
        lines.push([...segments]);
    });

    const lineObjects = lines.map((line) => {
        return new Line(new BufferGeometry().setFromPoints(line), material);
    });

    scene.add(...lineObjects);

    const loader = new TextureLoader();
    var boyTexture = loader.load(boyPng);
    boyTexture.magFilter = NearestFilter;
    var boyMaterial = new SpriteMaterial({ map: boyTexture });
    var boySprite = new Sprite(boyMaterial);
    boySprite.scale.set(0.7, 0.7, 0.7);
    boySprite.position.set(0.02, 0, -0.05);
    scene.add(boySprite);

    let frameCount = 0;
    let frame = requestAnimationFrame(function loop() {
        boySprite.position.z = Math.sin(++frameCount / 100) / 100;
        scene.rotateOnWorldAxis(new Vector3(0, 0, 1), Math.PI / 180 * rotateAmount);
        frame = requestAnimationFrame(loop);
        renderer.render(scene, camera);
    });

    onCleanup(() => {
        cancelAnimationFrame(frame);
    });

    return <div class={classnames(props.class)}>
        <div>SPIRIT-TIME</div>
        <div class={classnames(styles.threeContainer)}>{renderer.domElement}</div>
    </div>
}