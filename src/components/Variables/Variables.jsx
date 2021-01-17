import React,{ useEffect, useState } from 'react';

const Variables = ({getData, deleteData}) => {
    const [step, setStep] = useState(0);
    const [ vars, setVars ] = useState({
        base_var: "",
        restriction_var: "",
        operation: 0, // 0:max 1:min
    });
    const [z, setZ] = useState({});
    const [r, setR] = useState({});
    const [x, setX] = useState({});
    const resetMethod = () => {
        deleteData();
        setZ({});
        setX({});
        setR({});
        setVars({
            base_var: "",
            restriction_var: "",
            operation: 0, // 0:max 1:min
        });
    };
    const handleButton = () => {
        if(step === 0) {
            if(vars.restriction_var && vars.base_var) setStep(step + 1);
            else alert('Llena ambas casillas')
        } else if(step === 1) {
            setStep(step + 1);
            getData({"z":z, "vars":vars,"x":x,"r":r});
        } else if( step === 2 ) {
                setStep(0);
                resetMethod();
        }
    };


    useEffect(() => {
        if ( vars.base_var && Object.keys(z).length=== 0) {
            // crea la funcion objetivo
            const tempZ = {};
            //console.log('hey en borrar z');
            for(let i=0; i < vars.base_var; i++) {
                tempZ[i] = 0;
            }
            setZ(tempZ);
        }
    }, [vars.base_var]);
    useEffect(() => {
        if ( vars.restriction_var && Object.keys(x).length === 0) {
            // crea restricciones
            //console.log('hey en borrar x')
            const tempX = {};
            const tempR = {};
             for(let i=0; i < vars.restriction_var; i++){
                tempX[i] = Array(vars.base_var + 1).fill(0);
                tempR[i] = '=';
            }
            setR(tempR);
            setX(tempX);
        }
    }, [vars.restriction_var]);

    return ( <>
        <div>
            { step ===0 && (<div className="grid grid-cols-2 gap-4">
                <div>
                    <label> Cantidad de variables </label>
                    <input 
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 sm:text-base border-gray-300 rounded-md"
                        placeholder="Máx 10"
                        type="Number"
                        max="10"
                        id="base_var"
                        onChange={(e) => setVars({
                            ...vars,
                            base_var: parseInt(e.target.value),
                        })}
                        value={vars.base_var}
                        required
                        />
                </div>
                <div>
                    <label> Cantidad de restricciones </label>
                    <input 
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 sm:text-base border-gray-300 rounded-md"
                        placeholder="Máx 10"
                        type="Number"
                        max="10"
                        onChange={(e) => setVars({
                            ...vars,
                            restriction_var: parseInt(e.target.value),
                        })}
                        id="restriction_var"
                        value={vars.restriction_var}
                        required
                        />
                </div>
            </div>)}
            { step===1 && (<div>
                <label htmlFor="forma">Forma</label>
                <select id="forma" 
                onChange={(e) =>  setVars({
                    ...vars,
                    operation: parseInt(e.target.value),
                })}
                name="forma" className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md my-2">
                    {/* <option value="0">Maximizar</option> */}
                    <option value="1">Minimizar</option>
                </select>
                <div className={`grid grid-cols-${vars.base_var} gap-4 my-2`}>
                   { Object.keys(z).map((i) =>  <div  key={i + 'objetivo'}>
                        <input 
                            className="focus:ring-indigo-500 focus:border-indigo-500 inline w-24 m-0 sm:text-base border-gray-300 rounded-md pl-1"
                            placeholder="Máx 10"
                            type="Number"
                           
                            onChange={(ev) => {
                                const temp = {...z};
                                temp[i] = parseInt(ev.target.value);
                                setZ(temp);
                            }}
                            min='2'
                            max="20"
                            value={z[i]}
                        /> { i <= vars.restriction_var ? `X${parseInt(i)+1}`: ''}{ i > vars.restriction_var ? ` + `: ' = 0'}
                    </div>)
                    }
                </div>
                <div className="flex flex-col">
                    { Object.keys(x).map((i) =>
                        <div className="flex" key={i + 'rest'}>
                            {x[i].map((e, j) =><div className="flex flex-row" key={i+j}>
                                { j === vars.base_var && (
                                <div>
                                    <select name={`restriction${i}`}
                                    value={r[i]} className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                    key={'res'+i}
                                    onChange={(ev)=> {
                                        const temp = {...r};
                                        setR({...temp,
                                            [i]: ev.target.value,
                                        });
                                    }}>
                                        <option value="<=">{`<=`}</option>
                                        <option value="=">{`=`}</option>
                                        <option value=">=">{`>=`}</option>
                                    </select>
                                </div>
                                )}
                                <div>
                                <input 
                                    className="focus:ring-indigo-500 focus:border-indigo-500 inline w-16 m-0 sm:text-base border-gray-300 rounded-md pl-1"
                                    placeholder="Máx 10"
                                    type="Number"
                                    id={i + "r" +j}
                                    key={ i +'rest' +j}
                                    onChange={(ev) => {
                                        const temp = {...x};
                                        temp[i][j] = parseInt(ev.target.value);
                                        setX(temp);
                                    }}
                                    value={x[i][j]}
                                /> { j + 1 <= vars.restriction_var ? `X${j +1}${j<vars.restriction_var-1?'+':''} `: ''}
                            </div>
                            </div>
                            )}
                        </div>
                    )}
                </div>
            </div>)}
            { step===2 && (<div>LISTO!! REVISA TU PROCEDIMIENTO</div>)}
            <div className="m-3 flex justify-center">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                onClick={handleButton}>
                   {step <2 ? 'siguiente': 'reiniciar'}
                </button>
            </div>
            {/* { step === 2 &&
            (<div className="m-3 flex justify-center">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                onClick={() => {
                    setStep(1);
                }}>
                 corregir valores
                </button>
            </div>)
            } */}
        </div>
    </> );
}
 
export default Variables;