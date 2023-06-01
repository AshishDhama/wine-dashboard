import React from 'react';
import Stats from './pages/Stats.page';

import './App.css';

function App(): JSX.Element {
  return (
    <div className="main">
      <h1 className="title">Wine Testing Stats</h1>
      <Stats />
    </div>
  );
}

export default App;
