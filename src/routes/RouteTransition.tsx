import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

export const RouteTransition = (props: PropsWithChildren & {className: string}) => {
    return <motion.div 
        className={props.className}
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.3}}}
        exit={{opacity: 0, transition: {duration: 0.1}}}
    >
        {props.children}
    </motion.div>;
}