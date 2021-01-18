const getResults = ({vars,z,x,r}) => {
    let tablesR = [{ vX:[0], vZ:[0]}];
    let vZ = {
        ...Object.keys(z).map(e => -z[e])
    };
    let temp = vars.restriction_var;
    let vX = {...x};
    Object.keys(r).map((key) => {
        if(r[key] === '>=') {
            vX[key]= x[key].map(e => -e);
        } else if(r[key] === '=') {
            vX[temp] = x[key].map(e => -e);
            temp++;
        }
    });
    vars.restriction_var = temp;

    const m = Object.keys(vX).reduce((acc, i) => {
            const arry = [...Array(vars.restriction_var).fill(0)];
            arry[i] = 1;
            // console.log('X antes de meterle vars', vX[i]);
            vX[i].splice(vars.base_var, 0, ...arry);
            return {
                ...acc,
                [i]: vX[i],
            }; 
            // console.log('X luego de meterle vars', vX[i])
    }, {});
    tablesR[0].vX = m;
    for(let i = 0; i <= vars.restriction_var; i++) {
        vZ[vars.base_var + i ] = 0;
    }
    //console.log(vZ, vX);
    tablesR[0].vZ = vZ;

    if(Object.keys(vZ).some(e => vZ[e] < 0 )){
        let noiteracion = 0;
        if(Object.keys(vZ).some(e => vZ[e] < 0) ) {
            //console.log(getDualFact(vX),tablesR[noiteracion].vX);
            const cond = getDualFact(vX, noiteracion);
            console.log(cond)
            while (getDualFact(vX, noiteracion)) { 
                const renglonPivote = getRenglonPivote(vX);
                //console.log('renglonPivote', renglonPivote);
                const columnaPivote = getColumnaPivote(vZ, vX, vars.base_var, renglonPivote);
                //console.log('columna', columnaPivote); 
                const coefDiv = vX[renglonPivote][columnaPivote];            // leugo simplex v[renglon pivote] = v[renglon].map(e => e / coefdiv) / 
                //console.log('coefDiv', coefDiv); 
                //console.log(vX[renglonPivote],' Vector pivote');
                //console.log(vX[renglonPivote],'Nuevo Vector pivote', vX[renglonPivote].map(e => e / coefDiv));
                vX[renglonPivote] = vX[renglonPivote].map(e => e / coefDiv);
                // luego vZ = VZ.map(i => VZ[i] - (VZ[columnaPivote]*vX[renglon pivote][i])) 
                //console.log(vX[renglonPivote],'Nuevo Vector pivote');
                
                // for 0 hasta vX
               
                for(let i = 0; i < vars.restriction_var; i++) {
                // si i !== renglonPivote ( 
                    console.log('condición', i != renglonPivote,i);
                    if(i != renglonPivote) {
                        // vX[i] =vX[i].map(j => Vx[i][j] - (VZ[i][columnaPivote]*vX[renglon pivote][j]))
                        //console.log('filaOriginal', vX[i]);
                        //console.log('Coeficiente de la columna pivote', vX[i][columnaPivote]);
                        //console.log('filaPivote',vX[renglonPivote]);
                        vX[i] = vX[i].map((d,k) => {
                            //console.log(vX[i][k],vX[i][columnaPivote],vX[i][k], 'res', vX[i][k] - (vX[i][columnaPivote]*vX[i][k]));
                            return vX[i][k] - (vX[i][columnaPivote]*vX[renglonPivote][k])
                            });
                    }
                }  
                //console.log(vZ,vX);

                vZ = Object.keys(vZ).reduce((acc, act) => {
                    //console.log(vZ[i],vZ[columnaPivote],vX[renglonPivote][i]);
                        return {
                            ...acc,
                            [act]: vZ[act] - (vZ[columnaPivote] * vX[renglonPivote][act])
                        };
                    }, {}); 
                console.log('no Iteracion', noiteracion, 'vZ es: ',vZ, 'vX', vX);
                tablesR = [...tablesR,{vZ:vZ,vX:vX, r:renglonPivote, c:columnaPivote, coef: coefDiv, noiteracion: noiteracion}];
                
                    //)
                
                noiteracion++;
            }
            return [tablesR, vars];
        } else {
            return { error: 'No existe una solución factible'};
        }

    } else {
        return { error: 'No existe una solución factible'};
    }
    
};

const getDualFact = (arryObject, iteracion) => {
    if(iteracion == 10) return false;
    const size = arryObject[0].length;
    return Object.keys(arryObject).some(key=> arryObject[key][size-1] < 0);
};
const getRenglonPivote = (arryObject) => {
    let min= null;
    let indexM = null;
    const size = arryObject[0].length;
    for (const key in arryObject) {
        const t = arryObject[key][size-1];
        if(min === null) {
             min = t; 
             indexM = key;
        } else {
            if (t < min) {
                min = t;
                indexM = key;
            }
        }
    }
    return indexM;
};

const getColumnaPivote = (z, x, noB, renglonPivote) => {
    // for solo en vairbles no basicas
    const dualOptima = [...Array(noB).fill(0)].map((v,i) => {
        //console.log('dualoptima detalle', i, z[i], x[renglonPivote][i]);
        return z[i]/x[renglonPivote][i]
    });
    //console.log('dualOptima', dualOptima)
    // obtener la minima razón positiva y su sub indice, ese será la columna pivote
    let min= null;
    let indexM = null;
    for (const key in dualOptima) {
        const t = dualOptima[key];
        if(min === null) {
             min = t; 
             indexM = parseInt(key);
        } else {
            if (t < min) {
                min = t;
                indexM = key;
            }
        }
    }
    return indexM;
};

export default {
    getResults,
};