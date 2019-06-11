import React from "react";
import { Link } from "react-router-dom";

import Details from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <Details movie={movie} />
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
