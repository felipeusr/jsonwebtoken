import './App.css';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [clientes, setClientes] = useState([]);

  useEffect(()=>{
    Axios.post("http://localhost:3001/login", {
      user:"felipe",
      password:"123"
    }).then(res => {
      obterClientes(res.data.token)
    });
  });

  function obterClientes(token) {
    Axios.get("http://localhost:3001/clientes", {
      headers: {
        'x-access-token': token
      }
    }).then(items => {
      setClientes(items.data)
    })
  }

  return (
    <div className="App">
      {clientes.map(items => {
        return <p>{items.cliente}</p>
      })}
    </div>
  );
}