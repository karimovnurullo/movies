import React, { Component, createRef } from "react";
import { styles } from "./style";
import axios from "axios";
import { IMenus, IMovie, baseURL } from "./utils";
// import { PanelProps } from "./utils";

export default class Panel extends Component {
  state = {
    menuSelect: null,
    actionSelect: null,
    genreSelect: null,
    editGenreSelect: null,
    filteredMovies: [],
    editMovie: {
      title: "",
      genre: {
        _id: "",
        name: "",
      },
      stock: "",
      rate: "",
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
    this.setState({ actionSelect: value });
    console.log(value, "Selected");
  };
  genreSelect = (value: string) => {
    this.setState({ genreSelect: value });
  };
  editGenreSelect = async (id: string) => {
    const genre = [...this.state.genres].filter((g: IMenus) => g._id === id);
    const movies = [...this.state.movies].filter((m: IMovie) => m.genre._id === id);

    this.setState({ editGenreSelect: genre, filteredMovies: movies });
    console.log(genre, "Selected id");
  };
  editMovieSelect = async (id: string) => {
    const movie: IMovie = [...this.state.movies].filter((m: IMovie) => m._id === id)[0];

    this.setState({
      editMovie: {
        title: movie.title,
        genre: {
          _id: movie.genre._id,
          name: movie.genre.name,
        },
        stock: movie.numberInStock,
        rate: movie.dailyRentalRate,
      },
    });
    console.log(movie, "Selected id");
  };

  render() {
    const inputStyle = "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[18px] px-[10px] rounded-[10px] outline-none";
    const { menuSelect, actionSelect, genres, genreSelect, movies, editGenreSelect, filteredMovies, editMovie } = this.state;

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      const { menuSelect, actionSelect } = this.state;

      if (menuSelect === "movie") {
        const title = this.titleRef.current?.value;
        const stock = this.stockRef.current?.value;
        const rate = this.rateRef.current?.value;

        this.titleRef.current?.classList.remove("error");
        this.stockRef.current?.classList.remove("error");
        this.rateRef.current?.classList.remove("error");

        if (actionSelect === "add") {
          if (title && stock && rate && genreSelect) {
            console.log("Movie Form Submitted", {
              title,
              genreSelect,
              stock,
              rate,
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
            if (!genreSelect) {
              this.rateRef.current?.classList.add("error");
            }
            console.log("Please fill in all the fields.");
          }
        } else if (actionSelect === "edit") {
          // Handle edit action logic here
        } else if (actionSelect === "delete") {
          // Handle delete action logic here
        }
      } else if (menuSelect === "genre") {
        const title = this.titleRef.current?.value;
        this.titleRef.current?.classList.remove("error");
        if (title) {
          console.log("Genre Form Submitted");
          console.log("Title:", title);
          // Call the API or perform the necessary action for adding a genre
        } else {
          this.titleRef.current?.classList.add("error");
          console.log("Please enter a title.");
        }
      }
    };

    const renderSelect = () => {
      if (menuSelect === "movie") {
        return (
          <select
            onChange={(e) => this.actionSelect(e.target.value)}
            className="px-[10px] rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
            <option>Select Action</option>
            <option value="add">Add {menuSelect}</option>
            <option value="edit">Edit {menuSelect}</option>
            <option value="delete">Delete {menuSelect}</option>
          </select>
        );
      }
    };
    const renderEditSelect = () => {
      if (actionSelect === "edit") {
        return (
          <>
            <select
              onChange={(e) => this.editGenreSelect(e.target.value)}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => this.editMovieSelect(e.target.value)}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Menu</option>
              {filteredMovies.map(({ _id, title }) => (
                <option value={_id} key={_id}>
                  {title}
                </option>
              ))}
            </select>
          </>
        );
      }
    };

    const renderInputs = () => {
      if (actionSelect === "add") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <select
              onChange={(e) => this.genreSelect(e.target.value)}
              className="px-[10px] rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={name} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="text-[22px]">
              Stock
            </label>
            <input type="number" id="stock" ref={this.stockRef} className={`${inputStyle} mt-[-10px]`} />
            <label htmlFor="rate" className="text-[22px]">
              Rate
            </label>
            <input type="number" id="rate" ref={this.rateRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Movie
            </button>
          </>
        );
      } else if (actionSelect === "edit") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" defaultValue={editMovie.title} ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <label htmlFor="stock" className="text-[22px]">
              Stock
            </label>
            <input type="number" id="stock" defaultValue={editMovie.stock} ref={this.stockRef} className={`${inputStyle} mt-[-10px]`} />
            <label htmlFor="rate" className="text-[22px]">
              Rate
            </label>
            <input type="number" id="rate" defaultValue={editMovie.rate} ref={this.rateRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Movie
            </button>
          </>
        );
      } else if (menuSelect === "genre") {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Add Genre
            </button>
          </>
        );
      }
    };

    return (
      <div className={`${styles.center} p-[30px]  flex justify-center gap-[50px] bg-[#0D0D12] h-[100vh]`}>
        <div className="w-[400px] h-fit bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col">
          <select
            onChange={(e) => this.menuSelect(e.target.value)}
            className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
            <option>Select Add</option>
            <option value="movie">Movie</option>
            <option value="genre">Genre</option>
          </select>
          <form className="flex flex-col gap-[20px] mt-[10px]" onSubmit={handleSubmit}>
            {renderSelect()}
            {renderEditSelect()}
            {renderInputs()}
          </form>
        </div>
        {/* <div className="w-[400px] h-[400px] bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col"></div> */}
      </div>
    );
  }
}
