interface RedactedTextProps {
    knownText?: string;
    unknownText?: Array<number | string>;
}

export const RedactedText = (props: RedactedTextProps) => {
    if (props.knownText) {
        const knownTextRegex = /([a-z][A-Z][0-9])*/g
        return <span>{props.knownText.replace(knownTextRegex, "&#x25AE;")}</span>;
    } else if (props.unknownText) {
        return <span>{props.unknownText.reduce((acc, char) => {
            if (typeof char === "number") {
                acc += "&#x25AE;".repeat(char);
                acc += " ";
            } else {
                acc += char;
            }
            return char;
        }, "")}</span>;
    } else {
        return null;
    }
}