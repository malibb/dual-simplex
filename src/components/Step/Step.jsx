import React, { useEffect, useState } from 'react';

const TypeText = ({type, content}) => {
    return (
        <>{ type === 'title'
        ? <h2 key={Math.random(content)%100} className="text-lg font-semibold my-1">{content}</h2>
        : <div key={Math.random(content)%100} className="text-base mb-2">{content}</div>}</>
     );
}

const Step = ({stepNumber, text, children}) => {
    const [texts, setTexts] = useState([]);
    useEffect(()=> {
        setTexts(text);
    }, [texts, text]);
    return (
        <div className="box-border h-auto w-5/6 bg-blue-200 p-4 border-4 m-1.5">
            <h2 className="text-1xl">{stepNumber && `Paso ${stepNumber}:`}</h2>
            {texts && texts.map(t => <TypeText key={Math.random(t)%1000} type={t.type} content={t.text}/>)}
            {children}
        </div>
    );
}
 
export default Step;