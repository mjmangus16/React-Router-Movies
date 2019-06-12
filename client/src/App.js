import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      savedList: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => {
        this.setState(() => ({ movies: response.data }));
      })
      .catch(error => {
        console.error("Server Error", error);
      });
  }

  addToSavedList = movie => {
    const savedList = [...this.state.savedList];

    console.log(savedList.find(item => item.id === movie.id));

    if (!savedList.find(item => item.id === movie.id)) {
      savedList.push(movie);
      this.setState({ savedList });
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <SavedList list={this.state.savedList} />
        {movies.length > 0 && (
          <Route
            exact
            path="/"
            render={props => <MovieList {...props} movies={movies} />}
          />
        )}

        <Route
          path="/movies/:id"
          render={props => (
            <Movie
              {...props}
              id={props.match.params.id}
              addToSavedList={this.addToSavedList}
            />
          )}
        />
      </div>
    );
  }
}
