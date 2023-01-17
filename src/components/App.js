import { useState } from 'react';
import '../App.css';
import MainPage from './MainPage';
import {useEffect} from 'react';

function App() {

  return ( 
    <div className="p-4">
      <h1 className="font-bold text-2xl">Suivi des dépenses</h1>
      <MainPage />
      <div className="app">
      
      </div>
    </div>
  );
}



export default App;
