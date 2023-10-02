import React from 'react';
import DefineFixtures from '../components/generatePage/DefineFixtures';
import DefineVibe from '../components/generatePage/DefineVibe';
import Output from '../components/generatePage/Output';

const GeneratePage = () => {
  return (
   
    <div className="column-container">
        <DefineFixtures />
            <DefineVibe />
            <Output />
    </div>

  );
};

export default GeneratePage;
