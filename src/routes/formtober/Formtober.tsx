import { Route, useNavigate } from '@solidjs/router';
import classNames from 'classnames';
import { DateLabel } from './DateLabel';
import styles from './Formtober.module.scss';
import { Room } from '../room/Room';
import { RedactedText } from './RedactedText';

export const Formtober = () => {
    return <div class={styles.formtober}>
    </div>;
}

interface DirectoryItem {
    from?: string;
    to: string;
    unknownText?: Array<number | string>
    knownText?: string;
    path?: string;
}

const directory: DirectoryItem[] = [
    {
        from: "1",
        to: "3",
        unknownText: [5, 6],
        knownText: "THE ROOM OF SPIRIT AND TIME",
        path: "room"
    },
    {
        from: "4",
        to: "6",
        unknownText: [4, 2, 2, 3, 3, ". ", 2, ", ", 3, 5, 3, ". ", 3, 4, 3, ", ", 3, 5, 3, ". ", 2, ", ", 2],
        knownText: "LOOK ME IN THE EYE. NO, THE OTHER ONE. NOT THAT ONE, THE OTHER ONE. NO, TH"
    },
    {
        from: "7",
        to: "9",
        unknownText: [5, 2, 3, 6],
    },
    {
        from: "10",
        to: "12",
        unknownText: [5, 6],
    },
    {
        from: "13",
        to: "15",
        unknownText: [6, 2, 7],
    },
    {
        from: "16",
        to: "18",
        unknownText: [7, 2, 4, ": \"", 1, 4, 2, 5, 4, 5, 2, 2, "\". ", 2, 3, 3, "'", 1, ". ", 3, 3, 2, 6],
    },
    {
        from: "19",
        to: "21",
        unknownText: [4, 2, 5, 3, 7, 3, "?"],
    },
    {
        from: "22",
        to: "24",
        unknownText: [8, 4],
    },
    {
        from: "25",
        to: "27",
        unknownText: [8, 2, 3, 6, 5, 3, 3, 4, 3, 6, 2, 9, 4],
    },
    {
        from: "28",
        to: "30",
        unknownText: [4, 2, 3, 1, 5, 2, 5],
    },
    {
        to: "31",
        unknownText: [4, 4],
    },
]

const Directory = () => {
    const navigate = useNavigate();
    return <div class={styles.directory}>
        {directory.map((dirItem) => <>
            <div class={styles.dirItem} onClick={() => dirItem.path && navigate(dirItem.path)}>
                <DateLabel
                    from={dirItem.from}
                    to={dirItem.to}
                    fromClass={styles.from}
                    toClass={styles.to}
                    hyphenClass={styles.hyphen}
                />
                <RedactedText
                    unknownText={dirItem.unknownText}
                    knownText={dirItem.knownText}
                    class={classNames(styles.redactedText, dirItem.knownText && styles.underlined)}
                />
            </div>
        </>)}
    </div>;
}