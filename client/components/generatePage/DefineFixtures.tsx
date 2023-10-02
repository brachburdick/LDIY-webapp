import React, {useState, useEffect} from 'react';
import FixtureProfileSelectionBox from './defineFixtures/FixtureProfileSelectionBox';
import {stateStoreType} from '../../redux/reducers/index';
const DefineFixtures: React.FC = () => {
  const [fixtureProfileCount, setFixtureProfileCount] = useState(0);

  return (
    <div className="column">
      <h2 className="column-title">Define Fixtures</h2>

      <div className="row-buttonRow">
        <button className="row-button">Manual Input</button>
        {["Select from Open Fixture Library", "Upload JSON"].map((label, idx) => (
          <div key={idx} style={{position: 'relative'}}>
            <button className="row-button disabled"  data-tooltip="This feature is not yet supported">{label}</button>
            <span className="row-tooltip">This feature is not yet supported</span>
          </div>
        ))}
      </div>

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
