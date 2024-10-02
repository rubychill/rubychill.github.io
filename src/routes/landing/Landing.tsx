import { Link, useLocation } from 'wouter';
import classnames from 'classnames';
import { Fireplace } from '../../components/fireplace/Fireplace';
import styles from './Landing.module.scss';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export interface LandingProps {
    class?: string;

}

const Landing = () => {

    return <motion.div 
        className={classnames(styles.center)}
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 5}}}
        exit={{opacity: 0, transition: {duration: 0.5}}}
    >
        <p className={styles.blurb}>stay a while and <Link href="/home">rest</Link></p>
        <Fireplace />
    </motion.div>
}

export default Landing;