//import { json } from 'express';
import React from 'react';

const UIComponent = () => {

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
        <button id = 'testButton' onClick={() => handleOtherClick('/')}>BUTTON</button>
        <button id = 'testButton' onClick={() => handleClick('/contact')}>Contact</button>
        <button id = 'testButton' onClick={() => handleClick('/retrieve')}>Retrieve</button>
        <button id = 'testButton' onClick={() => handleClick('/disconnect')}>Disconnect</button>
      </div>)
}

export default UIComponent;