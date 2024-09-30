import classnames from 'classnames'
import styles from './Fireplace.module.scss';
import Fire from './fire.svg?react';
import FireBase from './fire_base.svg?react';
import { useEffect, useRef } from 'react';

export interface FireplaceProps {
    class?: string;
}

export const Fireplace = (props: FireplaceProps) => {
    const fireRef = useRef<HTMLDivElement>(null);
    const frames: HTMLElement[] = [];
    let previousFrame = 0;
    let currentFrame = 0;
    let numFrames = 0;
    function animateSVGFrames() {
        // hide previous frame
        frames[previousFrame].style.display = "none";
        // shot current frame
        frames[currentFrame].style.display = "block";

        previousFrame = currentFrame;
        currentFrame += 1;

        // detect end of animation
        if (currentFrame >= numFrames) {
            currentFrame = 0;
        }
    }

    useEffect(() => {
        let intervalId = undefined;
        if (fireRef.current) {
            frames.push(...[...fireRef.current.querySelectorAll("g > g")].map(elem => elem as HTMLElement));
            numFrames = frames.length;
            frames.forEach((frame) => frame.style.display = "none");
            intervalId = setInterval(animateSVGFrames, 100);
        }

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return <div className={classnames(props.class, styles.fireImages)}>
        <div className={classnames(styles.fireBaseSvg, styles.svg)}>
            <FireBase />
        </div>
        <div className={classnames(styles.fireSvg, styles.svg)} ref={fireRef}>
            <Fire />
        </div>
    </div>
}