interface RedactedTextProps {
    knownText?: string;
    unknownText?: Array<number | string>;
    class?: string;
}

export const RedactedText = (props: RedactedTextProps) => {
    if (props.knownText) {
        const knownTextRegex = /([a-z][A-Z][0-9])*/g
        props.knownText.replace(knownTextRegex, '\u25AE')
        return <div class={props.class}>{props.knownText}</div>;
    } else if (props.unknownText) {
        return <div class={props.class}>{props.unknownText.reduce((acc, char) => {
            if (typeof char === "number") {
                if (acc.toString().charAt(acc.toString().length - 1) === '\u25AE') {
                    acc += " ";
                }
                acc += '\u25AE'.repeat(char);
            } else {
                acc += char;
            }
            return acc;
        }, "" as string)}</div>;
    } else {
        return null;
    }
}