import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Offset from './pages/Offset';
import Receipt from './pages/Receipt';
import Error from './pages/Error';
import ConnectWallet from './components/ConnectWallet';
import TransactionDetails from './components/TransactionDetails';
import OffsetTypes from './components/OffsetTypes';

import { CarbonOffsetProvider } from './contexts/CarbonOffsetContext';

import './App.css';

function App() {
  return (
    <CarbonOffsetProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/offset">
            <Offset />
          </Route>
          <Route path="/receipt">
            <Receipt />
          </Route>
          <Route path="/connect-wallet">
            <ConnectWallet />
          </Route>
          <Route path="/transaction-details">
            <TransactionDetails />
          </Route>
          <Route path="/offset-types">
            <OffsetTypes />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </CarbonOffsetProvider>
  );
}

export default App;
