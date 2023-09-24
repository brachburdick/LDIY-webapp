import React, {useState, useEffect} from 'react';
import FixtureProfileSelectionBox from './defineFixtures/FixtureProfileSelectionBox';
import {stateStoreType} from '../../redux/reducers/index';
const DefineFixtures: React.FC = () => {
  const [fixtureProfileCount, setFixtureProfileCount] = useState(0);

  return (
    <div className="column">
      <h2 className="column-title">Define Fixtures</h2>
      {[...Array(fixtureProfileCount + 1)].map((_, index) => (
        <React.Fragment key={index}>
          <FixtureProfileSelectionBox id={"FP_" + index} />
          {index < fixtureProfileCount && <div className="horizontal-line"></div>}
        </React.Fragment>
      ))}
      <button
        className="button"
        onClick={() => setFixtureProfileCount((prevCount) => prevCount + 1)}
      >
        Add Fixture
      </button>
    </div>
  );
};


export default DefineFixtures;
