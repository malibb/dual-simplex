import React,{ useState } from 'react';

const Variables = () => {
    const [step] = useState(0);
    const [ vars, setVars ] = useState({
        base_var: undefined,
        restriction_var: undefined
    });
    return ( <>
        <div>
            { step === 0 && (<div className="grid grid-cols-2 gap-4">
                <div>
                    <label> Cantidad de variables </label>
                    <input 
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 sm:text-base border-gray-300 rounded-md"
                        placeholder="Máx 20"
                        type="Number"
                        max="20"
                        id="base_var"
                        value={vars.base_var}
                        />
                </div>
                <div>
                    <label> Cantidad de restricciones </label>
                    <input 
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 sm:text-base border-gray-300 rounded-md"
                        placeholder="Máx 40"
                        type="Number"
                        max="20"
                        id="restriction_var"
                        value={vars.restriction_var}
                        />
                </div>
            </div>)}
            <div>

            </div>
            <div className="m-3 flex justify-center">
                <div className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                Listo
                </div>
            </div>
        </div>
    </> );
}
 
export default Variables;