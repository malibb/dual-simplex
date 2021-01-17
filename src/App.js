import React from 'react';
import Method from './components/Method/Method';

function App() {
  return (
    <div className="container flex justify-around flex-wrap content-between w-full h-full bg-gray-800  mx-auto">
      <h1 className="text-4xl	font-semibold mx-auto text-white block">Método dual simplex</h1>
      <h2 className="text-4xl	font-semibold mx-auto text-white">Equipo 2</h2>
      <div className="flex justify-around flex-wrap content-start h-full bg-gray-200 mx-auto">
        <Method/>
    </div>
    </div>
  );
}

export default App;
