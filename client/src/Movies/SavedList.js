import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink style={{color:'black', textDecoration:'none'}}
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link style={{color:'black',textDecoration:'none'}} to="/">Home</Link>
      </div>
      <div><Link style={{color:'black',textDecoration:'none'}} to='/add-movie'>Add Movie</Link></div>
    </div>
  );
}

export default SavedList;
