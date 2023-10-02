import React from 'react';
import ColorPicker from './defineVibe/ColorPicker'; // Adjust the path to your ColorPicker component

const DefineVibe = () => {
  return (
    <div className = "column">
      <h2 className="column-title">Define Vibe</h2>

      <div className="row-buttonRow">
        <button className="row-button">Global Color</button>
        {["General Vibe", "Pixel Mapping", "MIDI Mapping"].map((label, idx) => (
          <div key={idx} style={{position: 'relative'}}>
            <button className="row-button disabled" data-tooltip="This feature is not yet supported">{label}</button>
            <span className="row-tooltip">This feature is not yet supported</span>
          </div>
        ))}
      </div>
      <div className = 'colorPicker'>
        <ColorPicker />
      </div>
    </div>
  );
};

export default DefineVibe;

