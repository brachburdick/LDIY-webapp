import React from 'react';
// import UIComponent from '../components/UIComponent.jsx'
import { Link } from 'react-router-dom';
import '../styles.css'
import {stateStoreType} from '../redux/reducers/index'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  // add pertinent state here
  const interfaceState = useSelector((state:stateStoreType)=> state.interface);

  const connectToDevice = async () => {
    try {
      const res = await fetch('/dmx/connect', { method: 'POST' });
      const data = await res.json();  // Change this line to parse JSON
      console.log(data.message);  // Access the message property of the parsed JSON object
    } catch (err) {
      console.error('Failed to connect:', err);
    }
  };



  return(
    <div id = "header">
        <h1  >LDIY</h1>
            <Link className = "button" to="/">Home</Link>
            <Link  className = "button"  to="/stage">Stage</Link>
            <button className="button" onClick={connectToDevice}>Connect to DMX Interface</button>
            <p>{interfaceState.connection}</p>
    </div>
  );
}

export default Header;
