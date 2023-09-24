import React, {useState} from 'react'
import { BrowserRouter } from 'react-router-dom';

import MainContainer from './containers/MainContainer'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles.css'
import {useDispatch, useSelector} from 'react-redux'
import {stateStoreType} from './redux/reducers/index';

import { Link } from 'react-router-dom';
const App = () =>{
  const dispatch = useDispatch();
  const interfaceState = useSelector((state:stateStoreType)=> state.interface);
  const stageState = useSelector((state:stateStoreType)=> state.stage);

  
  
  
  
  
  const disconnect = async () => {
    try {
      const res = await fetch('/dmx/disconnect', { method: 'POST' });
      const text = await res.text();
      console.log(text);
    } catch (err) {
      console.error(err);
    }
  };
  
    return (
      <BrowserRouter>
       

        <div> 
          <Header></Header>
          <MainContainer ></MainContainer>
          <Footer></Footer>
        </div>
      </BrowserRouter>
      );
}
export default App;