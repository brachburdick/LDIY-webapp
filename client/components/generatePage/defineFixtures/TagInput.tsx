import React, { useState, useEffect } from "react";
interface Props{homeAddys: number[],updateProfile: (object) => void;}

const TagInput: React.FC<Props> = ({homeAddys, updateProfile}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState<string>("");

  const addOption = () => {
    const parsedValue = parseInt(currentOption, 10);
    if (
      currentOption &&
      !isNaN(parsedValue) &&
      parsedValue >= 1 &&
      parsedValue <= 255 &&
      !selectedOptions.includes(currentOption)
    ) {
      setSelectedOptions((prev) => [...prev, currentOption]);
    }
    setCurrentOption("");
  };

  const removeOption = (option: string) => {
    setSelectedOptions((prev) => prev.filter((o) => o !== option));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addOption();
    }
  };

  useEffect(() => {
    let selectedChannels =  selectedOptions.map((ele)=>parseInt(ele))
    updateProfile({target:{name:"homeAddys", value:selectedChannels}});
  }, [selectedOptions, updateProfile]);

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <input
          type="number"
          value={parseInt(currentOption)}
          
          onChange={(e) => setCurrentOption(e.target.value)}
          onBlur={addOption}
          onKeyDown={handleKeyDown}
          placeholder="Enter Home Addresses (1-255)"
          className="misc-input"
        />
      </div>
      <div>
        {selectedOptions.map((option) => (
         <div key={option} className="tag-input-selection" style={{ display: "inline-block", margin: "0 4px" }}>
         <span>{option}</span>
         <button
           style={{ marginLeft: "4px" }} /* Add padding to the button */
           onClick={() => removeOption(option)}
         >
           x
         </button>
       </div>
       
        ))}
      </div>
    </div>
  );
};

export default TagInput;
