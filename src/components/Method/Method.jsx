import React, { useEffect, useState } from 'react';
import Step from './../Step/Step';
import Table from './../Table/Table'
import data from './../../utils/data';
import Variables from '../Variables/Variables';
import u from './../../utils/method';
import './Method.css';

const Method = () => {
    const [tables, setTables] = useState([]);
    const [vars, setVars] = useState(null);
    const [answers, setAnswers] = useState(false)  

    const dualSimplex = (data) => {
        u.getResults()
        .then(()=>{

        }).catch();
    };
    
    const getData = (data) => {
        console.log(JSON.stringify(data));
        //const d = {"z":{"0":3,"1":2},"vars":{"base_var":2,"restriction_var":3,"operation":0},"x":{"0":[3,1,3],"1":[4,3,6],"2":[1,1,3]},"r":{"0":">=","1":">=","2":"<="}};
        const [tables, varsy] = u.getResults(data);
        //debugger;
        
        //console.log(JSON.stringify(tables));
        //console.log(JSON.stringify(varsy));
        setTables(tables);
        setVars(varsy);
        /* setTables([
            {
              "vX": {
                "0": [
                  -3,
                  -1,
                  1,
                  0,
                  0,
                  -3
                ],
                "1": [
                  -4,
                  -3,
                  0,
                  1,
                  0,
                  -6
                ],
                "2": [
                  1,
                  1,
                  0,
                  0,
                  1,
                  3
                ]
              },
              "vZ": {
                "0": -3,
                "1": -2,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
              }
            },
            {
              "vZ": {
                "0": -3,
                "1": -2,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0
              },
              "vX": {
                "0": [
                  1,
                  0,
                  -0.6,
                  0.19999999999999998,
                  0,
                  0.6
                ],
                "1": [
                  0,
                  1,
                  0.7999999999999999,
                  -0.5999999999999999,
                  0,
                  1.2000000000000002
                ],
                "2": [
                  0,
                  0,
                  -0.19999999999999996,
                  0.39999999999999997,
                  1,
                  1.2
                ]
              },
              "r": "1",
              "c": "1",
              "coef": -3,
              "noiteracion": 0
            },
            {
              "vZ": [
                {
                  "0": -0.3333333333333335
                },
                {
                  "1": 0
                },
                {
                  "2": 0
                },
                {
                  "3": -0.6666666666666666
                },
                {
                  "4": 0
                },
                {
                  "5": 4
                }
              ],
              "vX": {
                "0": [
                  1,
                  0,
                  -0.6,
                  0.19999999999999998,
                  0,
                  0.6
                ],
                "1": [
                  0,
                  1,
                  0.7999999999999999,
                  -0.5999999999999999,
                  0,
                  1.2000000000000002
                ],
                "2": [
                  0,
                  0,
                  -0.19999999999999996,
                  0.39999999999999997,
                  1,
                  1.2
                ]
              },
              "r": "0",
              "c": 0,
              "coef": -1.6666666666666667,
              "noiteracion": 1
            }
          ]);
        setVars({
            "base_var": 2,
            "restriction_var": 3,
            "operation": 0
          }); */
        setAnswers(true);
        console.log(tables);
    }
    const deleteData = () => {
        console.log('reniciar')
    };

    useEffect(() => {
        console.log(tables);
    },[])
    return (<>
        <Step text={data.steps.start}></Step>
        <Step text={data.steps.next}></Step>
        <Step text={data.steps.process}>
        <Variables getData={getData} deleteData={deleteData}></Variables>
        </Step>
        <Step text={data.steps.results}>

        {/* Se debe se acceder al c, coef, r del siguiente objeto, excepto en el último elemento */}
            { tables.length > 0 ? (
                tables.map((e, i) => i !== tables.length - 1 ?
                <Table 
                key={i + 'table'}
                r={tables[i+1].r}
                c={tables[i+1].c} 
                vX={tables[i].vX}
                vZ={tables[i].vZ}
                noB={vars.base_var}
                nB={vars.restriction_var}
                e={tables[i]}
                last={false}
                /> : <Table 
                key={i + 'table'}
                vX={tables[i].vX}
                vZ={tables[i].vZ}
                noB={vars.base_var}
                nB={vars.restriction_var}
                last={true}
                />
                )
            )
        : <h1>No hay datos</h1>}
        </Step>
        <Step text={data.steps.answers}>
        </Step>
        
    </>);
}
 
export default Method;