import React, { useState } from 'react';
import './Table.css';

const Table = ({r,c, vX, vZ, last, noB, nB}) => {
    const [d, setD] = useState({r,c, vX, vZ, last});
    const [arrayNoB] = useState(Array(noB).fill(0));
    const [arrayNB] = useState(Array(nB).fill(0));

    return (<>
        {d.last 
        ? <p> La tabla final es la siguiente </p> 
        : <p> Se hace la operación del vector con reglón pivote {parseInt(d.r) +1} y la columna pivote {parseInt(d.c) +1}.</p>}
        <div className="flex justify-center">
        <table class="table-auto">
            <thead>
                <tr>
                    <td className="p-1.5"> Vb </td>
                    {arrayNoB.map((e,i) => <td className={i === parseInt(d.r) ?'bg-yellow-200 p-1.5':' p-1.5'}>x{i+1}</td>)}
                    {arrayNB.map((e,i) => <td className="p-1.5" >S{i+1}</td>)}
                    <td className="p-1.5"> Sol </td>
                </tr>
            </thead>
            <tbody>
            <tr>
                 <td>Z</td>
                {d.vZ && Object.values(d.vZ).map((e,i) => <td className={i === parseInt(d.r) ?'bg-yellow-200 p-1.5':'p-1.5'}
                key={e+i+'z'}>{typeof e === 'object' ? e[i].toFixed(1): e.toFixed(1)}</td>)}
            </tr>
            {Object.values(vX).map((e,j) => 
            <tr key={e +'xy'} className={j === parseInt(d.c) ?'bg-pink-400':''}>
                <td>S{j + 1}</td>
                {
                    e.map((m,i) => <td key={'' +m +i +e} className={i === parseInt(d.r) ?'bg-yellow-200 p-1.5': last && i === e.length-1 ? 'bg-green-200 p-1.5': 'p-1.5'}
                    >{m.toFixed(1)}</td>)
                }
            </tr>)}
       </tbody></table>
        </div>
    </> );
}
 
export default Table;