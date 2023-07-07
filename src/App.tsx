import React, { Component, FormEvent } from "react";

import { Header, Home, Register, Login, Panel } from "./components";
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
    adminPanel: false,
    addSelect: null,
    activeMenu: false,
    // pathname: "/panel",
    pathname: window.location.pathname,
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
  handleMenuClick = (id: string) => {
    const arr = [...this.state.movies];
    let filteredMovies: IMovie[] = arr.filter(
      (m: IMovie) => m.genre._id === id
    );
    this.setState({ activeMenu: true });
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

  handleAdminpanel = () => {
    console.log("Admin panel called");
  };
  handleAddSelect = (value: string) => {
    console.log(`${value} selected`);
    // this.setState({ addSelect: value });
  };
  handleNavigate = (pathname: string) => {
    this.setState({ pathname });
  };
  getPage = () => {
    const {
      movies,
      menus,
      loginBtn,
      registerBtn,
      filteredMovies,
      notFound,
      currentUser,
      activeMenu,
    } = this.state;
    const {
      handleSearch,
      handleMenuClick,
      handleAllMenus,
      handleRegister,
      handleLoginBack,
      handleAdminpanel,
      handleLogin,
      handleNavigate,
    } = this;
    switch (this.state.pathname) {
      case "/register":
        return <Register onNavigate={handleNavigate} />;
      case "/login":
        return <Login onNavigate={handleNavigate} />;
      case "/panel":
        return <Panel />;
      default:
        return (
          <>
            <Header
              user={currentUser}
              onLogin={handleLogin}
              onRegister={handleRegister}
              adminPanel={handleAdminpanel}
              onNavigate={handleNavigate}
            />
            <Home
              menus={menus}
              search={handleSearch}
              movies={filteredMovies.length > 0 ? filteredMovies : movies}
              handleMenuClick={handleMenuClick}
              all={handleAllMenus}
              notFound={notFound}
              activeMenu={activeMenu}
            />
          </>
        );
        break;
    }
  };

  render() {
    // if (loginBtn) {
    //   return <Login home={handleLoginBack} />;
    // } else if (registerBtn) {
    //   return (
    //     <Register
    //       home={handleRegisterBack}
    //       onRegisterSubmit={hanleRegisterSubmit}
    //     />
    //   );
    // }

    return <div>{this.getPage()}</div>;
  }
}
