import styles from './App.module.scss';
import { CornerMenu } from './components/cornerMenu/CornerMenu';
import { Route, Switch, useLocation } from 'wouter';
import { Home } from './routes/home/Home';
import { Maze } from './routes/maze/Maze';
import { Who } from './routes/who/Who';
import { cloneElement, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useRoutes } from './routes/useRoutes';
import { Loading } from './components/loading/Loading';

const Landing = lazy(() => import("./routes/landing/Landing"));
const Room = lazy(() => import("./routes/room/Room"));

const App = () => {
    const [location] = useLocation();
    const element = useRoutes([
        {
            path: "/",
            element: <Landing />
        },
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/who",
            element: <Who />
        },
        {
            path: "/room",
            element: <Room />
        },
    ])

    return (
        <div className={styles.app}>
            <CornerMenu />
            <Suspense fallback={""}>
                <AnimatePresence mode="wait">
                    {element && cloneElement(element, {key: location})}
                </AnimatePresence>
            </Suspense>
        </div>
    );
};

export default App;
