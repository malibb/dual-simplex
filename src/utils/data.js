const data = {
    steps: {
        start: [
            { type: 'title', text:'TEORIA DE LA DUALIDAD'},
            { type: 'text', text:'Cada problema de programación lineal tiene un segundo problema asociado con el. Uno se denomina primal y el otro dual. Los 2 poseen propiedades muy relacionadas, de tal manera que la solución óptima a un problema proporciona información completa sobre la solución óptima para el otro.'},
            { type: 'text', text:'Las relaciones entre el primal y el dual se utilizan para reducir el esfuerzo de computo en ciertos problemas y para obtener información adicional sobre las variaciones en la solución óptima debidas a ciertos cambios en los coeficientes y en la formulación del problema. Esto se conoce como análisis de sensibilidad o post-optimidad.'}
        ],
        next: [
            { type: 'title', text:'CONDICION DE FACTIBILIDAD.'},
            { type: 'text', text:'La variable que sale es la variable básica que tiene el valor más negativo (los empates se rompen arbitrariamente si todas las variables básicas son negativas, el proceso termina y esta última tabla es la solución óptima factible).'},
            { type: 'title', text:'CONDICION DE OPTIMIDAD.'},
            { type: 'text', text:'La variable que entra se elige entre las variables no básicas como sigue. Tome los cocientes de los coeficientes de la función objetivo entre los coeficientes correspondientes a la ecuación asociada a la variable que sale.'},
            { type: 'text', text:'Ignore los cocientes asociados a denominadores positivos o cero.'},
            { type: 'text', text:'La variable que entra es aquella con el cociente más pequeño si el problema es de minimizar o el valor absoluto más pequeño si el problema es de maximización  (rompa los empates arbitrariamente). Si los denominadores son ceros o positivos el problema no tiene ninguna solución factible.'},
        ],
        process: [
            { type: 'title', text:'INGRESA TUS DATOS PARA LA GENERACIÓN DEL CÁLCULO'},
            { type: 'text', text:'El problema se adecuará al modelo estándar de programación lineal, agregando las variables de holgura, exceso y/o artificiales en cada una de las restricciones:'},
        ],
        results: [
            { type: 'title', text:'DESARROLLO'},
            { type: 'text', text:'Estos fueron los paso ejecutados'},
        ],
        answers: [
            { type: 'title', text:'Equipo 2: Métodos cuantitativos - Profesor José Cruz Martinez Perales '},
            { type: 'text', text:'Gracias por pasar a ver :)'},
        ],
    }
};

export default data;