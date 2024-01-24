// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Bar';
import Home from  './views/Home'
import Galeria from './views/Galeria'
import Terminos from './views/Terminos'
import Carrito from './views/Carrito'
import ComprarNumero from './views/ComprarNumero';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/compra" component={Compra} />
        <Route path="/carrito" component={Carrito} />
        <Route path="/terminos" component={Terminos} />
        <Route path="/galeria" component={Galeria} />
      </Switch>
    </Router>
  );
}

export default App;
