import { useState,useEffect } from "react";

import './App.css';
import Nav from "./nav";
import DetailPage from './component/detailedTrack';
import {BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import MainPage from "./component/mainTrack";





function App() {

  
  
    return (
        <Router>
            <Nav />
        <Routes>
        
          {/* stock list project */}
        
          <Route path="/stocks" element={<MainPage/>} ></Route>
        
          <Route path="/stocks/detail/:symbol" element={<DetailPage/>}></Route>         
        
        </Routes>               
        </Router>
          )
        }
        
        export default App;
        