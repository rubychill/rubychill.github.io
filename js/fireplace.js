function fireplaceOnLoad() {
    const frames = [];
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

    const ref = document.getElementById("fire");
    console.log(ref);
    frames.push(...[...ref.querySelectorAll("g > g")]);
    numFrames = frames.length;
    frames.forEach((frame) => frame.style.display = "none");
    setInterval(animateSVGFrames, 100);
}

document.addEventListener("DOMContentLoaded", () => SVGInject(document.querySelectorAll("img.injectable"), { onAllFinish: fireplaceOnLoad }));