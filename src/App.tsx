import React from 'react';
import FlavanoidsDetails from './pages/FlavanoidsDetails';

import './App.css';

function App(): JSX.Element {
  return (
    <div className="main">
      <h1 className="title">Wine Testing Stats</h1>
      <FlavanoidsDetails />
    </div>
  );
}

export default App;
