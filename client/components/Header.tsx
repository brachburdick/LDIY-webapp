import React, {useState, useEffect} from 'react';
// import UIComponent from '../components/UIComponent.jsx'
import { Link } from 'react-router-dom';
import '../styles.css'
import {stateStoreType} from '../redux/reducers/index'
import { useDispatch, useSelector } from 'react-redux';
const { DMX, EnttecUSBDMXProDriver } = require("../../dmx-ts/src/index");
import { connectToInterfaceAC } from '../redux/actions/actions';
let dmx = new DMX();
let universe;

const Header = () => {
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState("Connect to DMX Interface");
  const interfaceState = useSelector((state:stateStoreType)=> state.interface);

  const connectToDevice = async () => {
    try {
      await dispatch(connectToInterfaceAC()); 
      // If the connection is successful, you can update the state if needed
    } catch (error) {
      alert("Failed to connect!");
    }
  };;

  useEffect(() => {
    console.log(interfaceState.connection)
    if (interfaceState.connection){
      setButtonText('Connected to: Enttec DMX USB PRO')
    }
  }, [interfaceState.connection]);


  return(
    <div id="header">
      <span>
      <h1>LDIY</h1>
      </span>
      <span>
      <h3>The world's first & only in-browser Lighting Desk Software</h3>
      </span>
      
      <button
        className="button"
        onMouseOver={() => setButtonText("This feature supports Enttec USB PRO DMX")}
        onMouseOut={() => setButtonText("Connect to DMX Interface")}
        onClick={connectToDevice}
      >
        {buttonText}
      </button>
      <p>{interfaceState.connection}</p>
    </div>
  );
}

export default Header;
