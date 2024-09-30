import styles from './App.module.scss';
import { CornerMenu } from './components/cornerMenu/CornerMenu';
import { Route, Switch } from 'wouter';
import { Home } from './routes/home/Home';
import { Maze } from './routes/maze/Maze';
import { Who } from './routes/who/Who';
import { lazy, Suspense } from 'react';

const Landing = lazy(() => import("./routes/landing/Landing"));
const Room = lazy(() => import("./routes/room/Room"));

const App = () => {
  return (
    <div className={styles.app}>
      <CornerMenu />
      <Suspense fallback="Loading...">
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/maze" component={Maze} />
          <Route path="/room" component={Room} />
          <Route path="/who" component={Who} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;
