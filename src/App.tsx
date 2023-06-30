import React, { Component } from "react";
// import { Route, Redirect, Switch } from "react-router-dom";

import { Header, Home, Register, Login } from "./components";
import axios from "axios";
import Test from "./components/test";

export const baseURL = "https://pdp-movies-78.onrender.com/api/";
export interface IMenus {
  name: string;
  _id: string;
}
export interface IMovie {
  _id: string;
  title: string;
  genre: {
    name: string;
    _id: string;
  };
  numberInStock: number;
  dailyRentalRate: number;
}
export default class App extends Component {
  state = {
    menus: [],
    movies: [],
    filteredMovies: [],
    registerBtn: false,
    loginBtn: false,
    notFound: false,
  };

  componentDidMount(): void {
    this.getMenus();
    this.getMovies();
  }

  getMenus = async () => {
    try {
      const { data } = await axios.get(`${baseURL}genres`);
      this.setState({ menus: data });
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };

  getMovies = async () => {
    try {
      const { data } = await axios.get(`${baseURL}movies`);
      this.setState({ movies: data });
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  handleLogin = () => {
    this.setState({ loginBtn: true });
  };

  handleLoginBack = () => this.setState({ loginBtn: false });
  handleRegisterBack = () => this.setState({ registerBtn: false });

  handleRegister = () => {
    this.setState({ registerBtn: true });
  };
  handleMenuClick = (id: string, name: string) => {
    const arr = [...this.state.movies];
    let filteredMovies: IMovie[] = arr.filter(
      (m: IMovie) => m.genre._id === id
    );
    if (filteredMovies.length > 0) {
      this.setState({ filteredMovies, notFound: false });
    } else {
      this.setState({ notFound: true });
    }
  };
  handleSearch = (text: string) => {
    const searchText = text.toLowerCase();
    const filteredMovies = this.state.movies.filter((movie: IMovie) =>
      movie.title.toLowerCase().includes(searchText)
    );

    this.setState({
      filteredMovies: filteredMovies,
      notFound: filteredMovies.length === 0,
    });
  };
  handleAllMenus = () => {
    const arr = [...this.state.movies];
    this.setState({ filteredMovies: arr, notFound: false });
  };

  render() {
    const { movies, menus, loginBtn, registerBtn, filteredMovies, notFound } =
      this.state;
    const {
      handleSearch,
      handleMenuClick,
      handleAllMenus,
      handleRegister,
      handleRegisterBack,
      handleLoginBack,
    } = this;
    if (loginBtn) {
      return <Login home={handleLoginBack} />;
    } else if (registerBtn) {
      return <Register home={handleRegisterBack} />;
    }

    return (
      <div>
        <Header onLogin={this.handleLogin} onRegister={handleRegister} />
        <Home
          menus={menus}
          search={handleSearch}
          movies={filteredMovies.length > 0 ? filteredMovies : movies}
          handleMenuClick={handleMenuClick}
          all={handleAllMenus}
          notFound={notFound}
        />
      </div>
    );
  }
}
