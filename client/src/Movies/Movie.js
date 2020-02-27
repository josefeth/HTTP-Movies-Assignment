import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
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

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }
  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }
  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }
  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };
  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  editMovie = () => {
    this.props.history.push(`/update-movie/${this.state.movie.id}`)
  }
  deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(response => {
     
      this.props.history.push('/')
    })
    .catch(err => console.log(err));
  }
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        {/* <Button className="save-button" onClick={this.saveMovie}>
          Save
        </Button> */}
        <div className="EditandDelete">
        <Button className="save-button" onClick={this.saveMovie}>
          Save
        </Button>
        <Button onClick={this.editMovie}>
          Edit
        
        </Button>
        <Button style={{ alignItems:'center' }} onClick={this.deleteMovie}>Delete Movie</Button>
        </div>
      </div>
    );
  }
}