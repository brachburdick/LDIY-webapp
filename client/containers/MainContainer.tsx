import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../styles.css'
import StagePage from '../components/StagePage'
import Home from '../components/HomePage';
import QuidAddition from '../components/QuidAddition';
import GenerateContainer from './GenerateContainer'
const MainContainer = () => {
  // add pertinent state here
  return (
    <div>
      <Routes>
        <Route path="/" element={<GenerateContainer />} />
        <Route path="/stage" element={<StagePage />} />
        <Route path="/AddFixture" element={<QuidAddition />} />
      </Routes>
    </div>
  );
};

export default MainContainer;
