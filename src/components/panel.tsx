import React, { Component, createRef } from "react";
import { styles } from "./style";
import axios from "axios";
import { IMenus, IMovie, baseURL } from "./utils";
// import { PanelProps } from "./utils";

import "../assets/css/main.scss";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc3ODZiZGUzODAyMjQ3MTFjZDhiZWIiLCJuYW1lIjoiTnVydWxsbyIsImVtYWlsIjoia2FyaW1vdmRldmVsb3BlckBnbWFpbC5jb20iLCJpYXQiOjE2ODg2MjUxNzJ9.ERrAWSo1Jl4vLZftbAsoD46bdc6qW54_PNjHDoTSDUQ";
const ADMIN_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc4ZjczYzlhNmI5OTdiODQ1ZWNhZjAiLCJuYW1lIjoiYXJzbG9uYmVrWFgiLCJlbWFpbCI6ImFyc0Bkb21haW4uY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg4NjY4ODM3fQ.eecj26FcL6B16Oqs-Cv13Y2P_sqvo9DSIEYHzfTUans";

interface PanelState {
  menuSelect: null | string;
  actionSelect: null | string;
  genreSelect: null | string;
  editGenreSelect: IMenus | null;
  ediMovieGenreSelect: string;
  deleteMovieSelect: string;
  genreActionSelect: string;
  deleteGenreSelect: string;
  control: boolean;
  filteredMovies: IMovie[];
  editMovie: {
    id: string;
    title: string;
    genre: {
      _id: string;
      name: string;
    };
    stock: number;
    rate: number;
    selected: boolean;
  } | null;
  genres: IMenus[];
  movies: IMovie[];
}
export default class Panel extends Component<{}, PanelState> {
  state: PanelState = {
    menuSelect: null,
    actionSelect: null,
    genreSelect: null,
    editGenreSelect: null,
    deleteMovieSelect: "",
    ediMovieGenreSelect: "",
    genreActionSelect: "",
    deleteGenreSelect: "",
    control: true,
    filteredMovies: [],
    editMovie: {
      id: "",
      title: "",
      genre: {
        _id: "",
        name: "",
      },
      stock: 0,
      rate: 0,
      selected: false,
    },
    genres: [],
    movies: [],
  };
  titleRef = createRef<HTMLInputElement>()!;
  rateRef = createRef<HTMLInputElement>()!;
  stockRef = createRef<HTMLInputElement>()!;
  genreRef = createRef<HTMLSelectElement>()!;

  getGenres = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/genres`);
      this.setState({ genres: data });
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  getMovies = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/movies`);
      this.setState({ movies: data });
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };
  componentDidMount(): void {
    this.getGenres();
    this.getMovies();
  }

  menuSelect = (value: string) => {
    this.setState({ menuSelect: value });
    console.log(value, "Selected");
  };
  actionSelect = (value: string) => {
    const isAdd = value === "add" ? false : value === "delete" ? false : true;
    this.setState({ actionSelect: value, control: isAdd });
    console.log(value, "Selected");
  };
  genreSelect = async (value: string) => {
    this.setState({ genreSelect: value });
  };
  editGenreSelect = (id: string) => {
    const genre = [...this.state.genres].filter((g: IMenus) => g._id === id);
    const movie = [...this.state.movies].filter((m: IMovie) => m.genre._id === id);

    this.setState({ editGenreSelect: genre[0], filteredMovies: movie });
    console.log(genre[0].name, "Selected genre");
  };
  editMovieSelect = async (id: string) => {
    const movie: IMovie = this.state.movies.find((m: IMovie) => m._id === id)!;

    this.setState({
      editMovie: {
        id: movie._id,
        title: movie.title,
        genre: {
          _id: movie.genre._id,
          name: movie.genre.name,
        },
        stock: movie.numberInStock,
        rate: movie.dailyRentalRate,
        selected: true,
      },
      control: false,
    });
    console.log(movie, "Selected id");
  };
  deleteMovieSelect = async (id: string) => {
    const movie: IMovie = this.state.movies.find((m: IMovie) => m._id === id)!;
    console.log(movie.title, "Selected movie");
    this.setState({ deleteMovieSelect: movie._id });
  };
  editMovieGenreSelect = async (id: string) => {
    this.setState({ ediMovieGenreSelect: id });
    console.log(id, "Selected movie genre");
  };
  genreActionSelect = async (value: string) => {
    const isAdd = value === "add" ? false : value === "delete" ? false : true;
    this.setState({ genreActionSelect: value, control: isAdd });
    console.log(value, "Selected genre action");
  };
  deleteGenreSelect = async (id: string) => {
    const genre: IMenus = this.state.genres.find((g: IMenus) => g._id === id)!;
    console.log(genre.name, "Selected genre");
    this.setState({ deleteGenreSelect: genre._id });
  };

  render() {
    const {
      menuSelect,
      deleteMovieSelect,
      genreActionSelect,
      deleteGenreSelect,
      actionSelect,
      genres,
      genreSelect,
      editGenreSelect,
      filteredMovies,
      editMovie,
      ediMovieGenreSelect,
      control,
    } = this.state;

    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      const { menuSelect, actionSelect } = this.state;
      this.getGenres();
      this.getMovies();

      // if (menuSelect === "movie") {
      const title = this.titleRef.current?.value;
      const stock = this.stockRef.current?.value;
      const rate = this.rateRef.current?.value;

      this.titleRef.current?.classList.remove("error");
      this.stockRef.current?.classList.remove("error");
      this.rateRef.current?.classList.remove("error");

      if (menuSelect === "movie" && actionSelect === "add") {
        if (title && stock && rate && genreSelect && title.length >= 5) {
          let movie = {
            title,
            genreId: genreSelect,
            numberInStock: parseInt(stock),
            dailyRentalRate: parseInt(rate),
          };
          try {
            const res = await axios.post(`${baseURL}/movies`, movie, {
              headers: {
                "x-auth-token": `${TOKEN}`,
              },
            });
            this.setState({
              control: true,
              menuSelect: null,
              actionSelect: null,
            });
          } catch (error) {
            console.log("Error adding movie:", error);
          }
        } else {
          if (!title) {
            this.titleRef.current?.classList.add("error");
          }
          if (!stock) {
            this.stockRef.current?.classList.add("error");
          }
          if (!rate) {
            this.rateRef.current?.classList.add("error");
          }
          console.log("Please complate in all");
        }
      } else if (menuSelect === "movie" && actionSelect === "edit") {
        if (title && stock && rate && title.length >= 5) {
          const isGenreId = ediMovieGenreSelect ? ediMovieGenreSelect : editGenreSelect?._id;
          let movie = {
            title,
            genreId: isGenreId,
            numberInStock: parseInt(stock),
            dailyRentalRate: parseInt(rate),
          };
          console.log("Movie Edit Form Submitted", movie);
          const { data } = await axios.put(`${baseURL}/movies/${this.state.editMovie?.id}`, movie, {
            headers: {
              "x-auth-token": `${TOKEN}`,
            },
          });
          console.log(data);

          this.setState({
            control: true,
            menuSelect: null,
            actionSelect: null,
            editGenreSelect: null,
            filteredMovies: [],
            editMovie: {
              id: "",
              title: "",
              genre: {
                _id: "",
                name: "",
              },
              stock: 0,
              rate: 0,
              selected: false,
            },
          });
        } else {
          if (!title) {
            this.titleRef.current?.classList.add("error");
          }
          if (!stock) {
            this.stockRef.current?.classList.add("error");
          }
          if (!rate) {
            this.rateRef.current?.classList.add("error");
          }
          console.log("Please fill in all the fields.");
        }
        // Handle edit action logic here
      } else if (menuSelect === "movie" && actionSelect === "delete") {
        if (deleteMovieSelect) {
          console.log(deleteMovieSelect, "movie deleted");
          try {
            console.log(deleteMovieSelect, "Movie deleted");
            const { data } = await axios.delete(`${baseURL}/movies/${deleteMovieSelect}`, {
              headers: {
                "x-auth-token": `${ADMIN_TOKEN}`,
              },
            });
            console.log(data);

            this.setState({
              control: true,
              deleteMovieSelect: "",
              menuSelect: null,
              editGenreSelect: null,
              actionSelect: null,
            });
          } catch (error) {
            console.log("Error deleting movie:", error);
          }
        } else {
          console.log("Please fill in all the fields.");
        }
      }
      if (genreActionSelect === "add") {
        const title = this.titleRef.current?.value;
        if (title && title.length >= 5) {
          try {
            console.log(title, "Genre added");
            const genre = {
              name: title,
            };
            const { data } = await axios.post(`${baseURL}/genres`, genre, {
              headers: {
                "x-auth-token": `${TOKEN}`,
              },
            });
            console.log(data);

            this.setState({ control: true, actionSelect: null, genreActionSelect: "", menuSelect: "" });
          } catch (error) {
            console.log("Error adding genre:", error);
          }
        } else {
          this.titleRef.current?.classList.add("error");
          console.log("Please enter title.");
        }
      } else if (genreActionSelect === "delete") {
        if (deleteGenreSelect) {
          try {
            console.log(deleteGenreSelect, "Genre deleted");
            const { data } = await axios.delete(`${baseURL}/genres/${deleteGenreSelect}`, {
              headers: {
                "x-auth-token": `${ADMIN_TOKEN}`,
              },
            });
            console.log(data);

            this.setState({ control: true, actionSelect: null, genreActionSelect: "", menuSelect: "" });
          } catch (error) {
            console.log("Error deleting genre:", error);
          }
        } else {
          console.log("Please select genre.");
        }
      }
    };

    const renderSelect = () => {
      if (menuSelect === "movie") {
        return (
          <select onChange={(e) => this.actionSelect(e.target.value)} className="select">
            <option>Select Action</option>
            <option value="add">Add {menuSelect}</option>
            <option value="edit">Edit {menuSelect}</option>
            <option value="delete">Delete {menuSelect}</option>
          </select>
        );
      } else if (menuSelect === "genre") {
        return (
          <select onChange={(e) => this.genreActionSelect(e.target.value)} className="select">
            <option>Select Action</option>
            <option value="add">Add {menuSelect}</option>
            <option value="delete">Delete {menuSelect}</option>
          </select>
        );
      }
    };
    const renderEditSelect = () => {
      if (actionSelect === "edit") {
        return (
          <select onChange={(e) => this.editGenreSelect(e.target.value)} className="select">
            <option>Select Genre</option>
            {genres.map(({ _id, name }) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        );
      }
    };
    const renderMovieSelect = () => {
      if (editGenreSelect) {
        return (
          <select onChange={(e) => this.editMovieSelect(e.target.value)} className="select">
            <option>Select Movie</option>
            {filteredMovies.map(({ _id, title }) => (
              <option value={_id} key={_id}>
                {title}
              </option>
            ))}
          </select>
        );
      }
    };

    const renderInputs = () => {
      if (actionSelect === "add") {
        return (
          <>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={this.titleRef}
              placeholder="minimum 5 letter"
              className={`input placeholder:text-[#414141]`}
            />
            <label htmlFor="stock" className="label">
              Genre
            </label>
            <select onChange={(e) => this.genreSelect(e.target.value)} className="select">
              <option>Select Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="label">
              Stock
            </label>
            <input type="number" id="stock" ref={this.stockRef} className={`input`} />
            <label htmlFor="rate" className="label">
              Rate
            </label>
            <input type="number" id="rate" ref={this.rateRef} className={`input`} />
            <button type="submit" className="submit-btn">
              Add Movie
            </button>
          </>
        );
      } else if (editMovie!.selected) {
        return (
          <>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input type="text" id="title" defaultValue={editMovie!.title} ref={this.titleRef} className={`input`} />
            <label className="label">Genre</label>
            <select onChange={(e) => this.editMovieGenreSelect(e.target.value)} defaultValue={editGenreSelect?._id} className="select">
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="label">
              Stock
            </label>
            <input type="number" id="stock" defaultValue={editMovie!.stock} ref={this.stockRef} className={`input`} />
            <label htmlFor="rate" className="label">
              Rate
            </label>
            <input type="number" id="rate" defaultValue={editMovie!.rate} ref={this.rateRef} className={`input`} />
            <button type="submit" className="submit-btn">
              Add Movie
            </button>
          </>
        );
      } else if (actionSelect === "delete") {
        return (
          <>
            <label className="label">Genre</label>
            <select onChange={(e) => this.editGenreSelect(e.target.value)} defaultValue={editGenreSelect?._id} className="select">
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="label">
              Movie
            </label>
            <select onChange={(e) => this.deleteMovieSelect(e.target.value)} className="select">
              <option>Select Movie</option>
              {filteredMovies.map(({ _id, title }) => (
                <option value={_id} key={_id}>
                  {title}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">
              Delete Movie
            </button>
          </>
        );
      } else if (genreActionSelect === "add") {
        return (
          <>
            <label htmlFor="title" className="label">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`input`} />
            <button type="submit" className="submit-btn">
              Add Genre
            </button>
          </>
        );
      } else if (genreActionSelect === "delete") {
        return (
          <>
            <select onChange={(e) => this.deleteGenreSelect(e.target.value)} defaultValue={editGenreSelect?._id} className="select">
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn">
              Delete Genre
            </button>
          </>
        );
      }
    };

    return (
      <div className={`${styles.center} p-[30px]  flex justify-center gap-[50px] bg-[#0D0D12] h-[100vh] overflow-auto`}>
        <div className={`${control ? "flex" : "hidden"} w-[400px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex-col`}>
          <select onChange={(e) => this.menuSelect(e.target.value)} value={menuSelect ? "select" : ""} className="select">
            <option value="select">Select Add</option>
            <option value="movie">Movie</option>
            <option value="genre">Genre</option>
          </select>
          {renderSelect()}
          {renderEditSelect()}
          {renderMovieSelect()}
        </div>
        <div className={`${!control ? "flex" : "hidden"} w-[400px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex-col`}>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {renderInputs()}
          </form>
        </div>
      </div>
    );
  }
}
