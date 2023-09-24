import React from 'react';
// import UIComponent from '../components/UIComponent.jsx'
import { Link } from 'react-router-dom';
import '../styles.css'
import {stateStoreType} from '../redux/reducers/index'
import { useDispatch, useSelector } from 'react-redux';
const { DMX, EnttecUSBDMXProDriver } = require("dmx-ts");
import { connectToInterfaceAC } from '../redux/actions/actions';
let dmx = new DMX();
let universe;

const Header = () => {
  const dispatch = useDispatch();

  const connectToDevice = () => {
    dispatch(connectToInterfaceAC());
  };
  const interfaceState = useSelector((state:stateStoreType)=> state.interface);


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
