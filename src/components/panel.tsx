import React, { Component, createRef } from "react";
import { styles } from "./style";
import axios from "axios";
import { IMenus, IMovie, baseURL } from "./utils";
// import { PanelProps } from "./utils";

interface PanelState {
  menuSelect: null | string;
  actionSelect: null | string;
  genreSelect: null | string;
  editGenreSelect: IMenus | null;
  ediMovieGenreSelect: string;
  deleteMovieSelect: string;
  genreActionSelect: string;
  deleteGenreSelect: string;
  filteredMovies: IMovie[];
  editMovie: {
    title: string;
    genre: {
      _id: string;
      name: string;
    };
    stock: number;
    rate: number;
    selected: boolean;
  };
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
    filteredMovies: [],
    editMovie: {
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
    this.setState({ actionSelect: value });
    console.log(value, "Selected");
  };
  genreSelect = (value: string) => {
    this.setState({ genreSelect: value });
  };
  editGenreSelect = async (id: string) => {
    const genre = [...this.state.genres].filter((g: IMenus) => g._id === id);
    const movies = [...this.state.movies].filter((m: IMovie) => m.genre._id === id);

    this.setState({ editGenreSelect: genre[0], filteredMovies: movies });
    console.log(genre, "Selected genre");
  };
  editMovieSelect = async (id: string) => {
    const movie: IMovie = this.state.movies.find((m: IMovie) => m._id === id)!;

    this.setState({
      editMovie: {
        title: movie.title,
        genre: {
          _id: movie.genre._id,
          name: movie.genre.name,
        },
        stock: movie.numberInStock,
        rate: movie.dailyRentalRate,
        selected: true,
      },
    });
    console.log(movie, "Selected id");
  };
  deleteMovieSelect = async (id: string) => {
    const movie: IMovie = this.state.movies.find((m: IMovie) => m._id === id)!;
    console.log(movie.title, "Selected movie");
    this.setState({ deleteMovieSelect: movie._id });
  };
  editMovieGenreSelect = async (id: string) => {
    this.setState({ deleteMovieSelect: id });
    console.log(id, "Selected movie genre");
  };
  genreActionSelect = async (value: string) => {
    this.setState({ genreActionSelect: value });
    console.log(value, "Selected genre action");
  };
  deleteGenreSelect = async (id: string) => {
    const genre: IMenus = this.state.genres.find((g: IMenus) => g._id === id)!;
    console.log(genre.name, "Selected genre");
    this.setState({ deleteGenreSelect: genre._id });
  };

  render() {
    const inputStyle = "bg-[#151719] border-[1px] border-[#44444598] h-[40px] text-[18px] px-[10px] rounded-[10px] outline-none";
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
    } = this.state;

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
          if (title && stock && rate) {
            console.log("Movie Edit Form Submitted", {
              title,
              genre: ediMovieGenreSelect ? ediMovieGenreSelect : editGenreSelect?._id,
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
            console.log("Please fill in all the fields.");
          }
          // Handle edit action logic here
        } else if (actionSelect === "delete") {
          if (deleteMovieSelect) {
            console.log(deleteMovieSelect, "movie deleted");
          } else {
            console.log("Please fill in all the fields.");
          }
        }
      } else if (menuSelect === "genre") {
        if (deleteGenreSelect) {
          console.log(deleteGenreSelect, "genre deleted");
        } else {
          console.log("Please select a genre.");
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
      } else if (menuSelect === "genre") {
        return (
          <select
            onChange={(e) => this.genreActionSelect(e.target.value)}
            className="px-[10px] rounded-[10px] mt-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
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
        );
      }
    };
    const renderMovieSelect = () => {
      if (editGenreSelect != null) {
        return (
          <select
            onChange={(e) => this.editMovieSelect(e.target.value)}
            className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
          >
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
      } else if (editMovie.selected) {
        return (
          <>
            <label htmlFor="title" className="text-[22px]">
              Title
            </label>
            <input type="text" id="title" defaultValue={editMovie.title} ref={this.titleRef} className={`${inputStyle} mt-[-10px]`} />
            <label className="text-[22px]">Genre</label>
            <select
              onChange={(e) => this.editMovieGenreSelect(e.target.value)}
              defaultValue={editGenreSelect?._id}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
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
      } else if (actionSelect === "delete") {
        return (
          <>
            <label className="text-[22px]">Genre</label>
            <select
              onChange={(e) => this.editGenreSelect(e.target.value)}
              defaultValue={editGenreSelect?._id}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <label htmlFor="stock" className="text-[22px]">
              Movie
            </label>
            <select
              onChange={(e) => this.deleteMovieSelect(e.target.value)}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Select Movie</option>
              {filteredMovies.map(({ _id, title }) => (
                <option value={_id} key={_id}>
                  {title}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Delete Movie
            </button>
          </>
        );
      } else if (genreActionSelect === "add") {
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
      } else if (genreActionSelect === "delete") {
        return (
          <>
            <select
              onChange={(e) => this.deleteGenreSelect(e.target.value)}
              defaultValue={editGenreSelect?._id}
              className="px-[10px] rounded-[10px] h-[40px] cursor-pointer outline-none bg-[#151719] border-[1px] border-[#44444598]"
            >
              <option>Genre</option>
              {genres.map(({ _id, name }) => (
                <option value={_id} key={_id}>
                  {name}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-[#0D0D12] h-[45px] rounded-[10px] mt-[10px] text-[25px]">
              Delete Genre
            </button>
          </>
        );
      }
    };

    return (
      <div className={`${styles.center} p-[30px]  flex justify-center gap-[50px] bg-[#0D0D12] h-[100vh] overflow-auto`}>
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
            {renderMovieSelect()}
            {renderInputs()}
          </form>
        </div>
        {/* <div className="w-[400px] h-[400px] bg-[#1e1e21] rounded-[20px] p-[20px] flex flex-col"></div> */}
      </div>
    );
  }
}

// import React, { Component, createRef } from "react";
// import { styles } from "./style";
// import axios from "axios";
// import { IMenus, IMovie, baseURL } from "./utils";

// interface PanelState {
//   menuSelect: null | string;
//   actionSelect: null | string;
//   genreSelect: null | string;
//   editGenreSelect: IMenus | null;
//   ediMovieGenreSelect: string;
//   filteredMovies: IMovie[];
//   editMovie: {
//     title: string;
//     genre: {
//       _id: string;
//       name: string;
//     };
//     stock: number;
//     rate: number;
//     selected: boolean;
//   };
//   genres: IMenus[];
//   movies: IMovie[];
// }

// export default class Panel extends Component<{}, PanelState> {
//   state: PanelState = {
//     menuSelect: null,
//     actionSelect: null,
//     genreSelect: null,
//     editGenreSelect: null,
//     ediMovieGenreSelect: "",
//     filteredMovies: [],
//     editMovie: {
//       title: "",
//       genre: {
//         _id: "",
//         name: "",
//       },
//       stock: 0,
//       rate: 0,
//       selected: false,
//     },
//     genres: [],
//     movies: [],
//   };

//   titleRef = createRef<HTMLInputElement>()!;
//   rateRef = createRef<HTMLInputElement>()!;
//   stockRef = createRef<HTMLInputElement>()!;
//   genreRef = createRef<HTMLSelectElement>()!;

//   getGenres = async () => {
//     try {
//       const { data } = await axios.get(`${baseURL}/genres`);
//       this.setState({ genres: data });
//     } catch (error) {
//       console.log("Error fetching genres:", error);
//     }
//   };

//   getMovies = async () => {
//     try {
//       const { data } = await axios.get(`${baseURL}/movies`);
//       this.setState({ movies: data });
//     } catch (error) {
//       console.log("Error fetching movies:", error);
//     }
//   };

//   componentDidMount(): void {
//     this.getGenres();
//     this.getMovies();
//   }

//   menuSelect = (value: string) => {
//     this.setState({ menuSelect: value });
//     console.log(value, "Selected");
//   };

//   actionSelect = (value: string) => {
//     this.setState({ actionSelect: value });
//     console.log(value, "Selected");
//   };

//   genreSelect = (value: string) => {
//     this.setState({ genreSelect: value });
//   };

//   editGenreSelect = async (id: string) => {
//     const genre = this.state.genres.find((g) => g._id === id);
//     const movies = this.state.movies.filter((m) => m.genre._id === id);

//     // this.setState({ editGenreSelect: genre, filteredMovies: movies });
//     this.setState({ editGenreSelect: genre || null, filteredMovies: movies });

//     console.log(genre, "Selected genre");
//   };

//   editMovieSelect = async (id: string) => {
//     const movie = this.state.movies.find((m) => m._id === id);

//     if (movie) {
//       this.setState({
//         editMovie: {
//           title: movie.title,
//           genre: {
//             _id: movie.genre._id,
//             name: movie.genre.name,
//           },
//           stock: movie.numberInStock,
//           rate: movie.dailyRentalRate,
//           selected: true,
//         },
//       });
//       console.log(movie, "Selected id");
//     }
//   };

//   editMovieGenreSelect = async (id: string) => {
//     this.setState({ ediMovieGenreSelect: id });
//     console.log(id, "Selected movie genre");
//   };

//   handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const { menuSelect, actionSelect, genreSelect, editMovie, filteredMovies, ediMovieGenreSelect } = this.state;

//     const movie = {
//       title: this.titleRef.current!.value,
//       genre: {
//         _id: this.genreRef.current!.value,
//         name: this.genreRef.current!.options[this.genreRef.current!.selectedIndex].text,
//       },
//       stock: parseInt(this.stockRef.current!.value),
//       rate: parseInt(this.rateRef.current!.value),
//     };

//     if (menuSelect === "movies") {
//       if (actionSelect === "add") {
//         axios
//           .post(`${baseURL}/movies`, movie)
//           .then(() => {
//             this.getMovies();
//           })
//           .catch((error) => {
//             console.log("Error adding movie:", error);
//           });
//       } else if (actionSelect === "edit") {
//         axios
//           .put(`${baseURL}/movies/${editMovie.title}`, movie)
//           .then(() => {
//             this.getMovies();
//           })
//           .catch((error) => {
//             console.log("Error editing movie:", error);
//           });
//       } else if (actionSelect === "delete") {
//         const movieIds = filteredMovies.map((m) => m._id);
//         axios
//           .delete(`${baseURL}/movies`, { data: { movieIds } })
//           .then(() => {
//             this.getMovies();
//           })
//           .catch((error) => {
//             console.log("Error deleting movies:", error);
//           });
//       }
//     } else if (menuSelect === "genres") {
//       if (actionSelect === "add") {
//         axios
//           .post(`${baseURL}/genres`, { name: genreSelect })
//           .then(() => {
//             this.getGenres();
//           })
//           .catch((error) => {
//             console.log("Error adding genre:", error);
//           });
//       } else if (actionSelect === "edit") {
//         axios
//           .put(`${baseURL}/genres/${editMovie.genre._id}`, { name: genreSelect })
//           .then(() => {
//             this.getGenres();
//             this.getMovies();
//           })
//           .catch((error) => {
//             console.log("Error editing genre:", error);
//           });
//       } else if (actionSelect === "delete") {
//         axios
//           .delete(`${baseURL}/genres/${editMovie.genre._id}`)
//           .then(() => {
//             this.getGenres();
//             this.getMovies();
//           })
//           .catch((error) => {
//             console.log("Error deleting genre:", error);
//           });
//       }
//     }

//     this.titleRef.current!.value = "";
//     this.stockRef.current!.value = "0";
//     this.rateRef.current!.value = "0";
//     this.genreRef.current!.value = "";
//     this.setState({
//       menuSelect: null,
//       actionSelect: null,
//       genreSelect: null,
//       editGenreSelect: null,
//       ediMovieGenreSelect: "",
//       editMovie: {
//         title: "",
//         genre: {
//           _id: "",
//           name: "",
//         },
//         stock: 0,
//         rate: 0,
//         selected: false,
//       },
//       filteredMovies: [],
//     });
//   };

//   render() {
//     const { menuSelect, actionSelect, genreSelect, editGenreSelect, editMovie, genres, movies, filteredMovies, ediMovieGenreSelect } =
//       this.state;

//     return (
//       <div>
//         <h2>Add/Edit/Delete Movies and Genres</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div style={styles.formGroup}>
//             <label>Select Menu:</label>
//             <select onChange={(e) => this.menuSelect(e.target.value)} value={menuSelect || ""}>
//               <option value="">-- Select Menu --</option>
//               <option value="movies">Movies</option>
//               <option value="genres">Genres</option>
//             </select>
//           </div>
//           <div style={styles.formGroup}>
//             <label>Select Action:</label>
//             <select onChange={(e) => this.actionSelect(e.target.value)} value={actionSelect || ""}>
//               <option value="">-- Select Action --</option>
//               <option value="add">Add</option>
//               <option value="edit">Edit</option>
//               <option value="delete">Delete</option>
//             </select>
//           </div>
//           {menuSelect === "genres" && actionSelect === "edit" && (
//             <div style={styles.formGroup}>
//               <label>Select Genre:</label>
//               <select onChange={(e) => this.genreSelect(e.target.value)} value={genreSelect || ""}>
//                 <option value="">-- Select Genre --</option>
//                 {genres.map((genre) => (
//                   <option key={genre._id} value={genre.name}>
//                     {genre.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           {menuSelect === "movies" && (actionSelect === "edit" || actionSelect === "delete") && (
//             <div style={styles.formGroup}>
//               <label>Select Genre:</label>
//               <select onChange={(e) => this.editGenreSelect(e.target.value)} value={editGenreSelect ? editGenreSelect._id : ""}>
//                 <option value="">-- Select Genre --</option>
//                 {genres.map((genre) => (
//                   <option key={genre._id} value={genre._id}>
//                     {genre.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           {menuSelect === "movies" && actionSelect === "edit" && (
//             <div style={styles.formGroup}>
//               <label>Select Movie:</label>
//               <select onChange={(e) => this.editMovieSelect(e.target.value)}>
//                 <option value="">-- Select Movie --</option>
//                 {filteredMovies.map((movie) => (
//                   <option key={movie._id} value={movie._id}>
//                     {movie.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           {menuSelect === "movies" && (actionSelect === "add" || actionSelect === "edit") && (
//             <div style={styles.formGroup}>
//               <label>Title:</label>
//               <input type="text" ref={this.titleRef} defaultValue={editMovie.title} />
//             </div>
//           )}
//           {menuSelect === "movies" && (actionSelect === "add" || actionSelect === "edit") && (
//             <div style={styles.formGroup}>
//               <label>Rate:</label>
//               <input type="number" ref={this.rateRef} defaultValue={editMovie.rate.toString()} />
//             </div>
//           )}
//           {menuSelect === "movies" && (actionSelect === "add" || actionSelect === "edit") && (
//             <div style={styles.formGroup}>
//               <label>Stock:</label>
//               <input type="number" ref={this.stockRef} defaultValue={editMovie.stock.toString()} />
//             </div>
//           )}
//           {menuSelect === "movies" && (actionSelect === "add" || actionSelect === "edit") && (
//             <div style={styles.formGroup}>
//               <label>Genre:</label>
//               <select onChange={(e) => this.editMovieGenreSelect(e.target.value)} value={ediMovieGenreSelect || ""}>
//                 <option value="">-- Select Genre --</option>
//                 {genres.map((genre) => (
//                   <option key={genre._id} value={genre._id}>
//                     {genre.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   }
// }
