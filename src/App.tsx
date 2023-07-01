import React, { Component, FormEvent, FormEventHandler } from "react";
// import { Route, Redirect, Switch } from "react-router-dom";

import { Header, Home, Register, Login } from "./components";
import axios from "axios";
import { AppState, IMovie, baseURL } from "./components/utils";

export default class App extends Component<{}, AppState> {
  state = {
    menus: [],
    movies: [],
    filteredMovies: [],
    registerBtn: false,
    loginBtn: false,
    notFound: false,
    currentUser: null,
  };

  componentDidMount(): void {
    this.getMenus();
    this.getMovies();
  }

  getMenus = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/genres`);
      this.setState({ menus: data });
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  getMovies = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/movies`);
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
  hanleRegisterSubmit = async (
    e: FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    name: string
  ) => {
    e.preventDefault();
    if (
      username.trim().length !== 0 ||
      password.trim().length !== 0 ||
      name.trim().length !== 0
    ) {
      this.setState({ registerBtn: false });
      console.log(username);
      console.log(password);
      console.log(name);

      const { data } = await axios.post(`${baseURL}/users`, {
        name,
        email: username,
        password,
      });
      console.log(data);
      this.setState({ currentUser: data });
    }
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
      hanleRegisterSubmit,
    } = this;
    if (loginBtn) {
      return <Login home={handleLoginBack} />;
    } else if (registerBtn) {
      return (
        <Register
          home={handleRegisterBack}
          onRegisterSubmit={hanleRegisterSubmit}
        />
      );
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
