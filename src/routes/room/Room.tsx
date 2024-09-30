import classnames from 'classnames';
import styles from './Room.module.scss';
import { Vector3, BufferGeometry, Vector2, TextureLoader, Sprite } from 'three';
import range from 'lodash/range';
import boyPng from './boy.png';
import { useLayoutEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

const gridResolution = 20;
const lineResolution = 11;
const rotateAmount = 0.2;

const Room = () => {
    //const [quote, setQuote] = useState("");

    const dropPoint = 0.2;
    const curveFn = (x: number) => ((45 * Math.pow(x - 0.2, 1 / 6)) / 53) - 0.7
    const lines: Vector3[][] = [];
    range(gridResolution + 1).forEach((i) => {
        const offset = i / gridResolution - 0.5;
        // horizontal
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

    return <div className={classnames(styles.threeContainer)}>
        <Canvas
            camera={{
                fov: 75,
                aspect: 4/3,
                near: 0.1,
                far: 1000,
                position: [0, -0.6, 0.2],
                rotation: [(Math.PI / 180) * 70, 0, 0],
            }}
        >
            <Boy />
            <Lines lines={lines} />
        </Canvas>
    </div>
}

const Boy = () => {
    const boyRef = useRef<Sprite>(null);
    
    const loader = new TextureLoader();
    const boyTexture = loader.load(boyPng);

    useFrame((state) => {
        if (boyRef.current) {
            boyRef.current.position.setZ(Math.sin(state.clock.elapsedTime / 1.5) / 30 + 0.05);
        }
        state.scene.rotateOnWorldAxis(new Vector3(0, 0, 1), Math.PI / 180 * rotateAmount);
    });

    return <sprite
        position={[0.02, 0, -0.05]}
        scale={[0.7, 0.7, 0.7]}
        ref={boyRef}
    >
        <spriteMaterial map={boyTexture} />
    </sprite>
}

const Lines = (props: {lines: Vector3[][]}) => {
    return props.lines.map((line) => <Line line={line} key={line.map((item) => `${item.x}, ${item.y}, ${item.z}`).join(" - ")} />);
}

const Line = (props: {line: Vector3[]}) => {
    const geoRef = useRef<BufferGeometry>(null);
    useLayoutEffect(() => {
        if (geoRef.current) {
            geoRef.current.setFromPoints(props.line);
        }
    }, [props.line])
    return <line>
        <bufferGeometry ref={geoRef} />
        <lineBasicMaterial color={"white"} />
    </line>
}

export default Room;