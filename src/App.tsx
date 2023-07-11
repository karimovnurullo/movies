import { Component } from "react";

import { Header, Home, Register, Login, Panel } from "./components";
import axios from "axios";
import { AppState, IMovie, baseURL } from "./components/utils";

export default class App extends Component<{}, AppState> {
  state = {
    menus: [],
    movies: [],
    filteredMovies: [],
    notFound: false,
    currentUser: null,
    adminPanel: false,
    addSelect: null,
    activeMenu: false,
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
      localStorage.setItem("genres", JSON.stringify(data));
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  getMovies = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/movies`);
      this.setState({ movies: data });
      localStorage.setItem("movies", JSON.stringify(data));
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
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
  };
  handleNavigate = (pathname: string) => {
    this.setState({ pathname });
  };
  getPage = () => {
    const { filteredMovies, notFound, currentUser, activeMenu } = this.state;
    const movies = JSON.parse(localStorage.getItem("movies")!);
    const menus = JSON.parse(localStorage.getItem("genres")!);
    const {
      handleSearch,
      handleMenuClick,
      handleAllMenus,
      handleAdminpanel,
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
    }
  };

  render() {
    return <div>{this.getPage()}</div>;
  }
}
