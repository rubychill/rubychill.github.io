import { lazy, type Component } from 'solid-js';
import styles from './App.module.scss';
import { CornerMenu } from './components/cornerMenu/CornerMenu';
import { Route, Router } from '@solidjs/router';
import { Home } from './routes/home/Home';
import { Maze } from './routes/maze/Maze';
import { Who } from './routes/who/Who';

const Room = lazy(() => import("./routes/room/Room"));
const Landing = lazy(() => import ("./routes/landing/Landing"));

const App: Component = () => {
  return (
    <div class={styles.app}>
      <CornerMenu />
      <Router>
        <Route path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/maze" component={Maze} />
        <Route path="/room" component={Room} />
        <Route path="/who" component={Who} />
      </Router>
    </div>
  );
};

export default App;
