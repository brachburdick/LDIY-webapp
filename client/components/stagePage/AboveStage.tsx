//import { json } from 'express';
import React from 'react';
import { Link } from 'react-router-dom';

const AboveStage = () => {

const fetchWithAsync = async(path) =>{
  const response = await fetch(`http://localhost:3333${path}`);
  if(!response.ok){
    throw new Error('network response not ok')
  }
  return await response.json()
}

const handleClick =  async (path) =>{
  console.log('handleClick')

  try{
    const data = await fetchWithAsync(path);
    console.log('data from server: ' , data)
  } catch (error) {
    console.log('problem: ', error.message)
  }
}

const handleOtherClick = async (path) =>{
  const response =  await fetch(`http://localhost:3333${path}`)
  console.log('post other handleClick response')
  console.log(response)
}

    return (    
    <div>
        <Link className="nav-button" to="/AddFixture">Add Fixture</Link>

        {/* <button id = 'testButton' onClick={() => handleClick('/AddFixture')}>Add Fixture</button> */}
        <button id = 'testButton' onClick={() => handleClick('/AddGroup')}>Add Group</button>
        <button id = 'testButton' onClick={() => handleClick('/AddProjector')}>Add Projector</button>
        <button id = 'testButton' onClick={() => handleClick('/Reset')}>Reset Stage</button>
      </div>)
}




export default AboveStage