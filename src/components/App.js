/* eslint-disable quotes */
import React from "react";
import {Navbar, Nav, Button, Image, Card} from "react-bootstrap";
import {Router, Switch, Route, Link} from "react-router-dom";
import "../styles/App.css";
import history from "../helpers/history";
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;
