import React, {Component, useState} from 'react';
import TableBalance from './Table';
import Depenses from './Depenses';
import './modal.css';

class MainPage extends Component { 

    constructor() {
      super();
      this.state = {
        show: false
      };
      this.showModal = this.showModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }
  
    showModal = () => {
      this.setState({ show: true });
    };
  
    hideModal = () => {
      this.setState({ show: false });
    };
  
    render() {
        return (
            <div className="content-center items-center">
                <div className="text-center">
                    <h1 className="text-slate-500 m-auto">Balance actuelle</h1>
                </div>
                <div className="w-full">
                  <TableBalance/>
                </div>
                <div className="text-center">
                    <h1 className="text-slate-500 m-auto">Dépenses</h1>
                </div>
                <div className="w-full">
                  <Depenses data={this.props.data}/>
                </div>
                <div className="flex items-center">
                  {this.ButtonAdd()}
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                <p></p>
              </Modal>
             </div>
        );
    }
  
    ButtonAdd(){
      return <button className="rounded-full bg-lime-400 text-lime-800 px-4 py-2 m-auto" onClick={this.showModal} >Ajouter une dépense</button>
    }
  
  }
  
  const Modal = ({ handleClose, show, children }) => {
  
    const showHideClassName = show ? "display-block" : "display-none";
  
    const [title, setTitle] = useState('');
  
    const [type, setType] = useState('alimentaire');
  
    const [montant, setMontant] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState(undefined);

    const [err, setErr] = useState(undefined);

    const handleChange = event => {
      setTitle(event.target.value);
    }
  
    const handleChangeType = event => {
      setType(event.target.value);
    }
  
    const handleChangeMontant = event => {
      setMontant(event.target.value);
    }    

    

    const addValue = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/depense', {
          method: 'POST',
          body: JSON.stringify({
            titre: title,
            montant: montant,
            type: type
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result = await response.json();
  
        console.log('result is: ', JSON.stringify(result, null, 4));
  
        setData(result);
      } catch (err) {
        setErr(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    console.log(data); 
  
    return (
      <div className={showHideClassName}>
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-slate-500/50">
          <div className="relative px-4 w-full max-w-2xl h-full md:h-auto mt-16 ml-24 bg-white">
            <div className="flex justify-between items-start p-5 rounded-t border-b">
                <h3 className="text-xl font-semibold text-gray-500 lg:text-2xl">Ajouter une dépense</h3>
                <span className="cursor-pointer mt-2 font-bold" onClick={handleClose}>X</span>
            </div>
            <div className="p-6 space-y-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                < label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title" >
                  Titre 
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title" type="text" placeholder="Courses" value={title} onChange={handleChange}></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                < label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                  Type 
                </label>
                <select className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title" onChange={handleChangeType} value={type}> 
                  <option value="alimentaire">Alimentaire</option>  
                  <option value="transport">Transport</option>
                  <option value="loisir">Loisir</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                  Montant 
                </label>
                <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="title" type="number" step='0.1' placeholder="0" value={montant} onChange={handleChangeMontant}></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <button className="cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full disabled:bg-green-900 disabled:cursor-not-allowed" onClick={addValue} >
                    Ajouter
                  </button>
                  
              </div>
          </div>
        </div>
      </div>
      </div>
    );
    }

export default MainPage;