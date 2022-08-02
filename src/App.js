import './App.css';
import * as React from 'react';
import Login from './components/Login';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom';
import Ingredients from './components/Ingredients';
import Ingredient from './components/Ingredient';
import Recipes from './components/Recipes';

import Registration from './components/Registration';

function App() {
  return (
    <div>
    <Header></Header>
    
    <div>
      
      <Routes>
        <Route exact path="/" element={<HomePage></HomePage>}></Route>
        <Route exact path="/aboutus" element={<HomePage></HomePage>}></Route>
        <Route exact path="/recipes/:name" element={<Recipes></Recipes>}></Route>
        <Route exact path="/ingredients" element={<Ingredients></Ingredients>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/registration" element={<Registration></Registration>}></Route>
      </Routes>
    </div>
    
      <Footer></Footer>
    </div>
  );
}

export default App;
