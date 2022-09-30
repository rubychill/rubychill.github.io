import type { Component } from 'solid-js';
import styles from './App.module.scss';
import { CornerMenu } from './components/cornerMenu/CornerMenu';
import { Route, Router, Routes } from '@solidjs/router';
import { Landing } from './routes/landing/Landing';
import { Home } from './routes/home/Home';
import { Maze } from './routes/maze/Maze';
import { Formtober } from './routes/formtober/Formtober';

const App: Component = () => {
  return (
    <div class={styles.app}>
      {/* <CornerMenu /> */}
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/maze" component={Maze} />
        <Route path="/formtober" component={Formtober} />
      </Routes>
    </div>
  );
};

export default App;
