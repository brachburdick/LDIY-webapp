import React, { useRef, useEffect } from 'react';
import p5 from 'react-p5';
import '../styles.css'
import AboveStage from './stagePage/AboveStage';
import P5Stage from './stagePage/P5Stage';
import BelowStage from './stagePage/BelowStage'

const StagePage = () => {
 

  return (
  <div>
    <AboveStage/>
    <P5Stage/>
    <BelowStage/>
  </div>);
};

export default StagePage;
