import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '../src/Router/AppRouter'

function App() {


  return <div>
    <BrowserRouter>
    <h1>Bienvenido a la app</h1>
    <AppRouter />
     </BrowserRouter>
  </div>;
}

export default App;
