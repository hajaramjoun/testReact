import React from 'react';
import { connect } from "react-redux";
import {MovieActionTypes } from "./reducers/movieReducer";
import MoviesList from "./components/MoviesList"
import './App.css'


class App extends React.Component {

  render() {
  return (
    <div className="App">
       <MoviesList/>
    </div>
  );
}
}
export default App;