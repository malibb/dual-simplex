import React from 'react';
import Method from './components/Method/Method';

function App() {
  return (
    <div className="container flex justify-around flex-wrap content-between w-full h-full bg-green-100 mx-auto">
      <h1 className="text-4xl	font-semibold	m-1.5">Método dual simplex</h1>
      <div className="flex justify-around flex-wrap content-start h-full bg-green-100 mx-auto">
        <Method/>
    </div>
    </div>
  );
}

export default App;
