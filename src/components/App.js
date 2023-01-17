import { useState } from 'react';
import '../App.css';
import MainPage from './MainPage';
import {useEffect} from 'react';

function App() {

  const [depenses, setDepenses] = useState([]);

  const getDepenses = async() => {
    const reponse = await fetch ('http://localhost:4000/depenses').then((response)  => response.json());
    setDepenses(reponse);
  }

  useEffect(() => {
    getDepenses();
  }, []); 

  return ( 
    <div className="p-4">
      <h1 className="font-bold text-2xl">Suivi des dépenses</h1>
      <MainPage data={depenses}/>
      <div className="app">
      
      </div>
    </div>
  );
}



export default App;
