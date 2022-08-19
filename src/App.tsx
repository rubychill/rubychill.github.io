import type { Component } from 'solid-js';
import styles from './App.module.scss';
import { CornerMenu } from './components/cornerMenu/CornerMenu';
import { Route, Router, Routes } from '@solidjs/router';
import { Landing } from './routes/landing/Landing';
import { Home } from './routes/home/Home';

const App: Component = () => {
  return (
    <div class={styles.app}>
      <CornerMenu />
      <Routes>
        <Route path="/" component={Landing} />
        <Route path="/home" component={Home} />
      </Routes>
    </div>
  );
};

export default App;
