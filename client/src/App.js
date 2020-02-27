import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovie from "./Movies/AddMovie";
import UpdateMovie from "./Movies/UpdateMovie";
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  background-color:white;
  border-radius:10px;

 
`;
const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
    .then(response => {
      setMovies(response.data);
    })
  }, [])

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie style={{color:'black'}} {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route style={{color:'black'}}
        path="/update-movie/:id"
        render={props => {
          
          return <UpdateMovie {...props} movies={movies} />;
        }} />
      <Route style={{color:'black'}}
        path="/add-movie"
        component={AddMovie} />
    </>
  );
};
export default App;