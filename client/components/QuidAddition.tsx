import React, { useRef, useEffect } from 'react';
import p5 from 'react-p5';
import '../styles.css'

const QuidAddition = () => {
 const handleAddClick = async (args) =>{

    console.log('handleAddClick', args)
 }

  return (
  <div id = 'quidaddition'>
    <button id = 'addQuid' onClick = {()=> handleAddClick('example arg')}>Press to Add</button>
  </div>);
};

export default QuidAddition;
