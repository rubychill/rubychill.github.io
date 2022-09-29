import styles from './Formtober.module.scss';
import { RedactedText } from './RedactedText';

export const Formtober = () => {
    return <div class={styles.directory}>
        <div>
            <span>1 - 3</span>
            <RedactedText
                unknownText={[5, 6]}
            />
        </div>
        <div>
            <span>4 - 6</span>
            <RedactedText
                unknownText={[4, 2, 2, 3, 3, ". ", 2, ", ", 3, 5, 3, ". ", 3, 4, 3, ", ", 3, 5, 3, ". ", 2, ", ", 2]}
            />
        </div>
        <div>
            <span>7 - 9</span>
            <RedactedText
                unknownText={[5, 2, 3, 6]}
            />
        </div>
        <div>
            <span>10 - 12</span>
            <RedactedText
                unknownText={[5, 6]}
            />
        </div>
        <div>
            <span>13 - 15</span>
            <RedactedText
                unknownText={[6, 2, 7]}
            />
        </div>
        <div>
            <span>16 - 18</span>
            <RedactedText
                unknownText={[7, 2, 4, ": \"", 1, 4, 2, 5, 4, 5, 2, 2, "\". ", 2, 3, 3, "'", 1, ". ", 3, 3, 2, 6]}
            />
        </div>
        <div>
            <span>19 - 21</span>
            <RedactedText
                unknownText={[4, 2, 5, 3, 7, 3, "?"]}
            />
        </div>
        <div>
            <span>22 - 24</span>
            <RedactedText
                unknownText={[8, 4]}
            />
        </div>
        <div>
            <span>25 - 27</span>
            <RedactedText
                unknownText={[8, 2, 3, 6, 5, 3, 3, 4, 3, 6, 2, 9, 4]}
            />
        </div>
        <div>
            <span>28 - 30</span>
            <RedactedText
                unknownText={[4, 2, 3, 1, 5, 2, 5]}
            />
        </div>
        <div>
            <span>31</span>
            <RedactedText
                unknownText={[4, 4]}
            />
        </div>
    </div>
}