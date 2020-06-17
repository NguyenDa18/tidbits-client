import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar'
import Home from './pages/Home'
import Register from './pages/Register'

const App = () => (
  <Router>
    <Container>
      <MenuBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
    </Container>
  </Router>
)

export default App;
