import React, { useState } from 'react';
import Step from './../Step/Step'
import data from './../../utils/data';
import Variables from '../Variables/Variables';

const Method = () => {
    
    return (<>
        <Step text={data.steps.start}></Step>
        <Step stepNumber="1">
           <Variables></Variables>
        </Step>
        <Step text={data.steps.next}></Step>
        <Step text={data.steps.end}></Step>
    </>);
}
 
export default Method;