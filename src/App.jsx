import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import WeightForm from './components/WeightForm';
import WeightList from './components/WeightList';
import Login from './components/Login';

function App() {

  return (
    <div className="App">
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/form">
        <WeightForm />
      </Route>
      <Route exact path="/list">
        <WeightList />
      </Route>
    </div>
  )
}

export default App
