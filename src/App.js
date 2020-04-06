import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css';

import MenuBar from './components/MenuBar'

const App = () => (
  <Router>
    <Container>
      <MenuBar />
    </Container>
  </Router>
)

export default App;
