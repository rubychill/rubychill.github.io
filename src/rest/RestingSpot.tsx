import classnames from 'classnames'
import styles from './RestingSpot.module.scss';
import Fire from './fire.svg';
import FireBase from './fire_base.svg';

export interface RestingSpotProps {
    class?: string;
}

export const RestingSpot = (props: RestingSpotProps) => {
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

    return <div class={classnames(props.class, styles.center)}>
        <p class={styles.blurb}>stay a while and rest</p>
        <div class={styles.fireImages}>
            <div class={classnames(styles.fireBaseSvg, styles.svg)}>
                <FireBase />
            </div>
            <div class={classnames(styles.fireSvg, styles.svg)}>
                <Fire ref={(ref: SVGElement) => {
                    frames.push(...[...ref.querySelectorAll("g > g")].map(elem => elem as HTMLElement));
                    numFrames = frames.length;
                    frames.forEach((frame) => frame.style.display = "none");
                    setInterval(animateSVGFrames, 100);
                }} />
            </div>
        </div>
    </div>
}