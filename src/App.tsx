import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.scss';
import { RestingSpot } from './rest/RestingSpot';
import { CornerMenu } from './cornerMenu/CornerMenu';

const App: Component = () => {
  return (
    <div class={styles.app}>
      <CornerMenu />
      <RestingSpot />
    </div>
  );
};

export default App;
